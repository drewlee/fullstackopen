import { test, expect } from '@playwright/test'

const { beforeEach, describe } = test;

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'James T. Kirk',
        username: 'jameskirk',
        password: 'enterprise',
      },
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByRole('heading', { name: 'log in to application' })
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('jameskirk')
      await page.getByLabel('password').fill('enterprise')
      await page.getByRole('button', { name: 'login' }).click()

      const locator = await page.getByText('Logged in as James T. Kirk')
      await locator.waitFor()
      await expect(locator).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('jameskirk')
      await page.getByLabel('password').fill('invalid')
      await page.getByRole('button', { name: 'login' }).click()

      const locator = await page.getByText('Invalid username or password')
      await locator.waitFor()
      await expect(locator).toBeVisible()
    })
  })
})
