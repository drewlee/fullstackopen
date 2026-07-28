export const createUser = async (request, data) => {
  await request.post('/api/users', { data })
}

export const loginWith = async (page, username, password)  => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

export const createBlog = async (page, title, author, url) => {
  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)

  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} - ${author}`).waitFor()
}

export const logout = async (page) => {
  await page.getByRole('button', { name: 'logout' }).click()
}
