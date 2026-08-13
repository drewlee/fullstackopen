const createUser = async (request, data) => {
  await request.post('/api/users', { data })
}

const loginWith = async (page, username, password) => {
  await page.goto('/login')
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const logout = async (page) => {
  await page.getByRole('button', { name: 'logout' }).click()
}

const createBlog = async (page, title, author, url) => {
  if (!page.url().includes('/create')) {
    await page.getByRole('link', { name: 'new blog' }).click()
  }

  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)

  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} - ${author}`).waitFor()
}

const getBlogLocatorByText = async (page, title, author, shouldClick = false) => {
  const blogLocator = page
    .getByRole('link')
    .filter({ hasText: new RegExp(`${title}.+${author}`) })

  if (shouldClick) {
    await blogLocator.click()
  }

  return blogLocator
}

const clickLikeButtonTimes = async (times, locator) => {
  const likeLocator = locator.getByRole('button', { name: 'like' })

  for (let i = 0; i < times; i++) {
    await likeLocator.click()
  }
}

export {
  createUser,
  loginWith,
  logout,
  createBlog,
  getBlogLocatorByText,
  clickLikeButtonTimes,
}
