const createUser = async (request, data) => {
  await request.post('/api/users', { data })
}

const loginWith = async (page, username, password)  => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const logout = async (page) => {
  await page.getByRole('button', { name: 'logout' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)

  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} - ${author}`).waitFor()
}

const getBlogLocatorByHeading = async (page, title, author, shouldExpand = false) => {
  const blogLocator = page
    .getByRole('article')
    .filter({ hasText: new RegExp(`${title}.+${author}`) })

  if (shouldExpand) {
    await blogLocator.getByRole('button', { name: 'view' }).click()
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
  getBlogLocatorByHeading,
  clickLikeButtonTimes,
}
