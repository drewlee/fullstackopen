import { render, screen } from '@testing-library/react'
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
      id: 'abc123'
    }
  }
  const blogUser = {
    username: 'jameskirk',
  }

  test('blog url and likes are hidden by default', () => {
    render(<Blog blog={blog} user={blogUser} />)

    const title = screen.getByText(`${blog.title} - ${blog.author}`)
    const url = screen.getByText(blog.url)
    const likes = screen.getByText(blog.likes)

    expect(title).toBeVisible()
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })

  test('blog url and likes are visible on `view` button click', async () => {
    render(<Blog blog={blog} user={blogUser} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)

    const url = screen.getByText(blog.url)
    const likes = screen.getByText(blog.likes)

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
    expect(button).toHaveTextContent('hide')
  })

  test(
    'calls the provided props event handler when clicking the `like` button',
    async () => {
      const likeHandler = vi.fn()

      render(<Blog blog={blog} user={blogUser} handleBlogLike={likeHandler} />)

      const user = userEvent.setup()
      const viewButton = screen.getByText('view')

      await user.click(viewButton)

      const likeButton = screen.getByText('like')

      await user.click(likeButton)
      await user.click(likeButton)

      expect(likeHandler).toHaveBeenCalledTimes(2)
    }
  )
})
