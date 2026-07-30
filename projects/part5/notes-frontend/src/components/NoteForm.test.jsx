import { render, screen } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn().mockResolvedValue()
  const user = userEvent.setup()

  const Stub = createRoutesStub([
    {
      path: '/notes',
      Component: () => {},
    },
    {
      path: '/create',
      Component: () => <NoteForm createNote={createNote} />,
    },
  ])

  render(<Stub initialEntries={['/create']} />)

  const input = screen.getByRole('textbox')
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNote).toHaveBeenCalledTimes(1)
  expect(createNote).toHaveBeenCalledWith(
    {
      content: 'testing a form...',
      important: true,
    }
  )
})
