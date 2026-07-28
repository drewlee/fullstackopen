// @ts-check
import { test, expect } from '@playwright/test'
import { createUser, loginWith, createBlog, logout } from './helper.js'

const { beforeEach, describe } = test;

describe('Blog app', () => {
  const users = [
    {
      name: 'James T. Kirk',
      password: 'enterprise',
      username: 'jameskirk',
    },
    {
      name: 'Spock',
      password: 'logical',
      username: 'spock',
    }
  ]

  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await createUser(request, users[0])
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByRole('heading', { name: 'log in to application' })
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, users[0].username, users[0].password)

      const locator = page.getByText('Logged in as James T. Kirk')
      await expect(locator).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, users[0].username, 'invalid')

      const locator = page.getByText('Invalid username or password')
      await expect(locator).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, users[0].username, users[0].password)
        await page.getByRole('button', { name: 'create new blog' }).click()
      })

      test('can log out', async ({ page }) => {
        await logout(page)

        const locator = page.getByRole('heading', { name: 'log in to application' })
        await expect(locator).toBeVisible()
      })

      test('create a new blog form is shown', async ({ page }) => {
        const locator = page.getByRole('heading', { name: 'create new' })
        await expect(locator).toBeVisible()
      })

      test('create a new blog form can be hidden', async ({ page }) => {
        const locator = page.getByRole('heading', { name: 'create new' })

        await page.getByRole('button', { name: 'cancel' }).click()
        await expect(locator).toBeHidden()
      })

      describe('When creating a new blog', () => {
        const title = 'First blog'
        const author = 'Spock'
        const url = 'https://spock-blog.com/first'
        const blogRegExp = new RegExp(`${title}.+${author}`)

        beforeEach(async ({ page }) => {
          await createBlog(page, title, author, url)
        })

        test('new blog is rendered', async ({ page }) => {
          const blogContainer = page
            .getByRole('article')
            .filter({ hasText: blogRegExp })

          await expect(blogContainer).toBeVisible()
          await expect(blogContainer).toHaveCount(1)
        })

        test('blog details can be expanded', async ({ page }) => {
          const blogContainer = page
            .getByRole('article')
            .filter({ hasText: blogRegExp })

          await blogContainer.getByRole('button', { name: 'view' }).click()
          await expect(
            blogContainer.getByRole('button', { name: 'hide' })
          ).toBeVisible()

          const blogContent = blogContainer.getByRole('list')
          await expect(blogContent).toBeVisible()

          const blogItems = blogContent.getByRole('listitem')
          await expect(blogItems.nth(0)).toHaveText(url)
          await expect(blogItems.nth(1)).toHaveText(/0 likes/)
          await expect(blogItems.nth(2)).toHaveText(users[0].name)
        })

        test('new blog can be liked', async ({ page }) => {
          const blogContainer = page
            .getByRole('article')
            .filter({ hasText: blogRegExp })

          await blogContainer.getByRole('button', { name: 'view' }).click()
          await blogContainer.getByRole('button', { name: 'like' }).click()

          await expect(
            blogContainer.getByTestId('blog-likes-count')
          ).toHaveText('1 like')
        })

        test('new blog can be deleted', async ({ page }) => {
          page.on('dialog', (dialog) => dialog.accept())

          const blogContainer = page
            .getByRole('article')
            .filter({ hasText: blogRegExp })

          await blogContainer.getByRole('button', { name: 'view' }).click()
          await blogContainer.getByRole('button', { name: 'remove' }).click()
          await expect(blogContainer).toBeHidden()
          await expect(blogContainer).toHaveCount(0)
        })

        test('new blog can only be deleted by the owner', async ({ page, request }) => {
          await logout(page)
          await createUser(request, users[1])
          await loginWith(page, users[1].username, users[1].password)

          const blogContainer = page
            .getByRole('article')
            .filter({ hasText: blogRegExp })
          await blogContainer.getByRole('button', { name: 'view' }).click()

          await expect(
            blogContainer.getByRole('button', { name: 'remove' })
          ).toBeHidden()
        })
      })
    })
  })
})
