import { test, expect } from '@playwright/test'
import { loginWith, createBlog } from './helper.js'

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
      await loginWith(page, 'jameskirk', 'enterprise')

      const locator = await page.getByText('Logged in as James T. Kirk')
      await locator.waitFor()
      await expect(locator).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'jameskirk', 'invalid')

      const locator = await page.getByText('Invalid username or password')
      await locator.waitFor()
      await expect(locator).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'jameskirk', 'enterprise')
        await page.getByRole('button', { name: 'create new blog' }).click()
      })

      test('create a new blog form is shown', async ({ page }) => {
        const locator = await page.getByRole('heading', { name: 'create new' })
        await expect(locator).toBeVisible()
      })

      test('create a new blog form can be hidden', async ({ page }) => {
        const locator = await page.getByRole('heading', { name: 'create new' })

        await page.getByRole('button', { name: 'cancel' }).click()
        await expect(locator).not.toBeVisible()
      })

      test('a new blog can be created', async ({ page }) => {
        const title = 'First blog'
        const author = 'Spock'
        const url = 'https://spock-blog.com/first'
  
        await createBlog(page, title, author, url)

        const blogContainer = page
          .locator('.blog-container', { hasText: `${title} - ${author}` })
        const blogHeading = blogContainer.locator('.blog-heading')

        await expect(blogHeading).toBeVisible()
      })

      describe('When creating a new blog', () => {
        let title;
        let author;
        let url;

        beforeEach(async ({ page }) => {
          title = 'First blog'
          author = 'Spock'
          url = 'https://spock-blog.com/first'

          await createBlog(page, title, author, url)
        })

        test('blog details can be expanded', async ({ page }) => {
          const blogContainer = page
            .locator('.blog-container', { hasText: `${title} - ${author}` })
          const blogHeading = blogContainer.locator('.blog-heading')

          await blogHeading.getByRole('button', { name: 'view' }).click()

          const blogContent = blogContainer.locator('.blog-content')
          await expect(blogContent).toBeVisible()

          const blogItems = blogContent.locator('.blog-content-list-item')
          await expect(blogItems.nth(0)).toHaveText(url)
          await expect(blogItems.nth(1)).toHaveText('0like')
          await expect(blogItems.nth(2)).toHaveText('James T. Kirk')
        })
      })
    })
  })
})
