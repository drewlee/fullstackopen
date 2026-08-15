import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { notifyError, notifySuccess } from '../hooks/use-notification-context'
import BlogForm from './BlogForm'

vi.mock(import('../hooks/use-notification-context'), () => {
  const notifyError = vi.fn()
  const notifySuccess = vi.fn()

  return {
    default: () => ({ notifyError, notifySuccess }),
    notifyError,
    notifySuccess,
  }
})

describe('<BlogForm />', () => {
  const blog = {
    title: 'The Best Star Trek Series',
    author: 'Bob Jenkins',
    url: 'http://foo.com',
  }

  afterEach(() => {
    vi.resetAllMocks()
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
    expect(notifySuccess).toHaveBeenCalledOnce()
    expect(notifySuccess).toHaveBeenCalledWith(`Added ${blog.title} by ${blog.author}`)
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
    expect(notifySuccess).not.toHaveBeenCalled()
    expect(notifyError).toHaveBeenCalledOnce()
    expect(notifyError).toHaveBeenCalledWith(errorMsg)
  })

  test('calls the provided prop handler when a validation error occurs', async () => {
    const handleCreateBlog = vi.fn().mockResolvedValue()

    render(<BlogForm handleCreateBlog={handleCreateBlog} />)

    const createButtonEl = screen.getByText('create')
    await userEvent.click(createButtonEl)

    expect(handleCreateBlog).not.toHaveBeenCalled()
    expect(notifyError).toHaveBeenCalledOnce()
    expect(notifyError).toHaveBeenCalledWith('Title and url are required')
  })
})
