import { afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    id: '123abc',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'jameskirk',
      name: 'James T. Kirk',
      id: 'abc123',
    },
  }

  const blogUser = {
    username: 'jameskirk',
  }

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('buttons are hidden from users that are not logged in', () => {
    render(<Blog blog={blog} user={null} />)

    const title = screen.getByText(`${blog.title} - ${blog.author}`)
    const url = screen.getByText(blog.url)
    const likes = screen.getByText(`${blog.likes} likes`)
    const likeBtn = screen.queryByRole('button', { name: 'like' })
    const removeBtn = screen.queryByRole('button', { name: 'remove' })

    expect(title).toBeVisible()
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
    expect(likeBtn).not.toBeInTheDocument()
    expect(removeBtn).not.toBeInTheDocument()
  })

  test('remove button is hidden from user who is not the blog owner', () => {
    render(<Blog blog={blog} user={{ username: 'spock' }} />)

    const title = screen.getByText(`${blog.title} - ${blog.author}`)
    const url = screen.getByText(blog.url)
    const likes = screen.getByText(`${blog.likes} likes`)
    const likeBtn = screen.getByRole('button', { name: 'like' })
    const removeBtn = screen.queryByRole('button', { name: 'remove' })

    expect(title).toBeVisible()
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
    expect(likeBtn).toBeVisible()
    expect(removeBtn).not.toBeInTheDocument()
  })

  test('all buttons are visible for user who is the blog owner', () => {
    render(<Blog blog={blog} user={blogUser} />)

    const title = screen.getByText(`${blog.title} - ${blog.author}`)
    const url = screen.getByText(blog.url)
    const likes = screen.getByText(`${blog.likes} likes`)
    const likeBtn = screen.getByRole('button', { name: 'like' })
    const removeBtn = screen.getByRole('button', { name: 'remove' })

    expect(title).toBeVisible()
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
    expect(likeBtn).toBeVisible()
    expect(removeBtn).toBeVisible()
  })

  test('calls the provided props handler when clicking the `like` button', async () => {
    const handleBlogLike = vi.fn().mockResolvedValue()

    render(<Blog blog={blog} user={blogUser} handleBlogLike={handleBlogLike} />)

    const likeBtn = screen.getByRole('button', { name: 'like' })
    await userEvent.click(likeBtn)

    expect(handleBlogLike).toHaveBeenCalledOnce()
  })

  test('calls the provided error props handler when liking a blog fails', async () => {
    const errorMsg = 'Server error'
    const handleBlogLike = vi.fn().mockRejectedValue(new Error(errorMsg))
    const notifyError = vi.fn()

    render(
      <Blog
        blog={blog}
        user={blogUser}
        handleBlogLike={handleBlogLike}
        notifyError={notifyError}
      />,
    )

    const likeBtn = screen.getByRole('button', { name: 'like' })
    await userEvent.click(likeBtn)

    expect(handleBlogLike).toHaveBeenCalledOnce()
    expect(notifyError).toHaveBeenCalledOnce()
    expect(notifyError).toHaveBeenCalledWith(errorMsg)
  })

  test('disabled `like` button prevents multiple calls', async () => {
    const { promise, resolve } = Promise.withResolvers()
    const handleBlogLike = vi.fn().mockReturnValue(promise)

    render(<Blog blog={blog} user={blogUser} handleBlogLike={handleBlogLike} />)

    const likeBtn = screen.getByRole('button', { name: 'like' })
    await userEvent.click(likeBtn)

    expect(likeBtn).toBeDisabled()
    expect(handleBlogLike).toHaveBeenCalledOnce()
    resolve()

    await waitFor(() => {
      expect(likeBtn).toBeEnabled()
    })
  })

  test('calls the provided props handler when clicking the `remove` button', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    const handleBlogRemove = vi.fn().mockResolvedValue()
    const notifySuccess = vi.fn()

    render(
      <Blog
        blog={blog}
        user={blogUser}
        handleBlogRemove={handleBlogRemove}
        notifySuccess={notifySuccess}
        autoConfirm={true}
      />,
    )

    const removeBtn = screen.getByRole('button', { name: 'remove' })
    await userEvent.click(removeBtn)

    expect(handleBlogRemove).toHaveBeenCalledOnce()
    expect(notifySuccess).toHaveBeenCalledOnce()
    expect(notifySuccess).toHaveBeenCalledWith(
      `Removed blog "${blog.title}" by ${blog.author}`,
    )
  })

  test('calls the provided props handler when removing a blog fails', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    const errMessage = 'Server error'
    const handleBlogRemove = vi.fn().mockRejectedValue(new Error(errMessage))
    const notifyError = vi.fn()

    render(
      <Blog
        blog={blog}
        user={blogUser}
        handleBlogRemove={handleBlogRemove}
        notifyError={notifyError}
        autoConfirm={true}
      />,
    )

    const removeBtn = screen.getByRole('button', { name: 'remove' })
    await userEvent.click(removeBtn)

    expect(handleBlogRemove).toHaveBeenCalledOnce()
    expect(notifyError).toHaveBeenCalledOnce()
    expect(notifyError).toHaveBeenCalledWith(errMessage)
  })

  test('disabled `remove` button prevents multiple calls', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    const { promise, resolve } = Promise.withResolvers()
    const handleBlogRemove = vi.fn().mockReturnValue(promise)
    const notifySuccess = vi.fn()

    render(
      <Blog
        blog={blog}
        user={blogUser}
        handleBlogRemove={handleBlogRemove}
        notifySuccess={notifySuccess}
        autoConfirm={true}
      />,
    )

    const removeBtn = screen.getByRole('button', { name: 'remove' })
    await userEvent.click(removeBtn)

    expect(removeBtn).toBeDisabled()
    expect(handleBlogRemove).toHaveBeenCalledOnce()
    resolve()

    await waitFor(() => {
      expect(removeBtn).toBeEnabled()
    })
  })
})
