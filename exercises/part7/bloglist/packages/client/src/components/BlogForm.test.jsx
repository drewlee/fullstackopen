import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNotificationStore } from '../store'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const blog = {
    title: 'The Best Star Trek Series',
    author: 'Bob Jenkins',
    url: 'http://foo.com',
  }

  beforeEach(() => {
    useNotificationStore.setState({ message: null, type: null })
  })

  test('calls the provided prop handlers when creating a new blog', async () => {
    const handleCreateBlog = vi.fn().mockResolvedValue()

    render(<BlogForm handleCreateBlog={handleCreateBlog} />)

    const titleEl = screen.getByLabelText('title *')
    const authorEl = screen.getByLabelText('author')
    const urlEl = screen.getByLabelText('url *')
    const createButtonEl = screen.getByText('create')
    const user = userEvent.setup()

    await user.type(titleEl, blog.title)
    await user.type(authorEl, blog.author)
    await user.type(urlEl, blog.url)

    await user.click(createButtonEl)

    expect(handleCreateBlog).toHaveBeenCalledOnce()
    expect(handleCreateBlog).toHaveBeenCalledWith(blog)

    const { message, type } = useNotificationStore.getState()

    expect(message).toBe(`Added ${blog.title} by ${blog.author}`)
    expect(type).toBe('success')
  })

  test('calls the provided prop handler when the creation service fails', async () => {
    const errorMsg = 'Server error'
    const handleCreateBlog = vi.fn().mockRejectedValue(new Error(errorMsg))

    render(<BlogForm handleCreateBlog={handleCreateBlog} />)

    const titleEl = screen.getByLabelText('title *')
    const authorEl = screen.getByLabelText('author')
    const urlEl = screen.getByLabelText('url *')
    const createButtonEl = screen.getByText('create')

    const user = userEvent.setup()

    await user.type(titleEl, blog.title)
    await user.type(authorEl, blog.author)
    await user.type(urlEl, blog.url)

    await user.click(createButtonEl)

    expect(handleCreateBlog).toHaveBeenCalledOnce()
    expect(handleCreateBlog).toHaveBeenCalledWith(blog)

    const { message, type } = useNotificationStore.getState()
    expect(message).toBe(errorMsg)
    expect(type).toBe('error')
  })

  test('calls the provided prop handler when a validation error occurs', async () => {
    const handleCreateBlog = vi.fn().mockResolvedValue()

    render(<BlogForm handleCreateBlog={handleCreateBlog} />)

    const createButtonEl = screen.getByText('create')
    await userEvent.click(createButtonEl)

    expect(handleCreateBlog).not.toHaveBeenCalled()

    const { message, type } = useNotificationStore.getState()
    expect(message).toBe('Title and url are required')
    expect(type).toBe('error')
  })
})
