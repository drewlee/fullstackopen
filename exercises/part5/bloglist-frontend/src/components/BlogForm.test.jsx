import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls the provided props handler when creating a new blog', async () => {
    const createHandler = vi.fn().mockResolvedValue(true)

    render(<BlogForm handleCreateBlog={createHandler} />)

    const titleEl = screen.getByLabelText('title')
    const authorEl = screen.getByLabelText('author')
    const urlEl = screen.getByLabelText('url')
    const createButtonEl = screen.getByText('create')

    const user = userEvent.setup()
    const blog = {
      title: 'The Best Star Trek Series',
      author: 'Bob Jenkins',
      url: 'http://foo.com',
    }

    await user.type(titleEl, blog.title)
    await user.type(authorEl, blog.author)
    await user.type(urlEl, blog.url)

    await user.click(createButtonEl)

    expect(createHandler).toHaveBeenCalledOnce()
    expect(createHandler).toHaveBeenCalledWith(blog)
  })
})
