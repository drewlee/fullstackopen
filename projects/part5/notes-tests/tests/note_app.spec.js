const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'James T. Kirk',
        username: 'jameskirk',
        password: 'enterprise',
      },
    })
  })

  test('front page can be opened', async ({ page }) => {
    await page.goto('/')

    let locator = page.getByText(/Lorem ipsum dolor sit amet/)
    await expect(locator).toBeVisible()

    locator = page.getByText(
      'Note app, Department of Computer Science, University of Helsinki 2025'
    )
    await expect(locator).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'jameskirk', 'enterprise')
    await expect(page.getByText('James T. Kirk logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'jameskirk', 'wrong')

    const errorDiv = page.locator('.error')

    await expect(errorDiv).toContainText('wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    await expect(page.getByText('James T. Kirk logged in')).toBeHidden()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'jameskirk', 'enterprise')
      await page.locator('form').waitFor({ state: 'detached' })
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright')
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and several notes exist', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
      })

      test('one of those can be made non-important', async ({ page }) => {
        await page.getByRole('link', { name: 'second note' }).click()
        await page.getByRole('button', { name: 'make not important' }).click()
        await expect(page.getByRole('button', { name: 'make important' })).toBeVisible()
      })
    })
  })
})
