// @ts-check
import { test, expect } from '@playwright/test'
import {
  createUser,
  loginWith,
  logout,
  createBlog,
  getBlogLocatorByHeading,
  clickLikeButtonTimes,
} from './helper.js'

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
  const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    },
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

      test('new blog is created', async ({ page }) => {
        const { title, author, url } = blogs[0]

        await createBlog(page, title, author, url)

        const blogLocator = await getBlogLocatorByHeading(page, title, author)

        await expect(blogLocator).toHaveCount(1)
        await expect(blogLocator).toBeVisible()
      })

      describe('When there are several blogs', () => {
        beforeEach(async ({ page }) => {
          for (const blog of blogs) {
            const { title, author, url } = blog
            await createBlog(page, title, author, url)
          }
        })

        test('blog details can be expanded', async ({ page }) => {
          const { title, author, url } = blogs[1]
          const blogLocator = await getBlogLocatorByHeading(page, title, author)

          await blogLocator.getByRole('button', { name: 'view' }).click()
          await expect(
            blogLocator.getByRole('button', { name: 'hide' })
          ).toBeVisible()

          const blogContent = blogLocator.getByRole('list')
          await expect(blogContent).toBeVisible()

          const blogItems = blogContent.getByRole('listitem')
          await expect(blogItems.nth(0)).toHaveText(url)
          await expect(blogItems.nth(1)).toHaveText(/0 likes/)
          await expect(blogItems.nth(2)).toHaveText(users[0].name)
        })

        test('new blog can be liked', async ({ page }) => {
          const { title, author } = blogs[1]
          const blogLocator = await getBlogLocatorByHeading(page, title, author, true)

          await blogLocator.getByRole('button', { name: 'like' }).click()
          await expect(
            blogLocator.getByTestId('blog-likes-count')
          ).toHaveText('1 like')
        })

        test('new blog can be deleted', async ({ page }) => {
          page.on('dialog', (dialog) => dialog.accept())

          const { title, author } = blogs[1]
          const blogLocator = await getBlogLocatorByHeading(page, title, author, true)

          await blogLocator.getByRole('button', { name: 'remove' }).click()
          await expect(blogLocator).toBeHidden()
          await expect(blogLocator).toHaveCount(0)
        })

        test('new blog can only be deleted by the owner', async ({ page, request }) => {
          await logout(page)
          await createUser(request, users[1])
          await loginWith(page, users[1].username, users[1].password)

          const { title, author } = blogs[1]
          const blogLocator = await getBlogLocatorByHeading(page, title, author, true)

          await expect(
            blogLocator.getByRole('button', { name: 'remove' })
          ).toBeHidden()
        })

        test('blogs are ordered by number of likes', async ({ page }) => {
          test.setTimeout(30000)

          const likes = [2, 6, 3]

          for (let i = 0; i < blogs.length; i++) {
            const { title, author } = blogs[i]
            const blogLocator = await getBlogLocatorByHeading(page, title, author, true)

            await clickLikeButtonTimes(likes[i], blogLocator)
          }

          const allBlogsLocator = page.getByRole('article')

          await expect(allBlogsLocator).toHaveCount(3)
          await expect(
            allBlogsLocator.nth(0).getByTestId('blog-likes-count')
          ).toHaveText('6 likes')
          await expect(
            allBlogsLocator.nth(1).getByTestId('blog-likes-count')
          ).toHaveText('3 likes')
          await expect(
            allBlogsLocator.nth(2).getByTestId('blog-likes-count')
          ).toHaveText('2 likes')
        })
      })
    })
  })
})
