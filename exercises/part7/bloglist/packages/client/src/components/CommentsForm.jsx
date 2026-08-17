import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNotificationActions } from '../stores/notification'
import './CommentsForm.css'

const CommentsForm = ({ handleAddComment }) => {
  const { notifySuccess, notifyError } = useNotificationActions()
  const [isDisabled, setIsDisabled] = useState(true)
  const [value, setValue] = useState('')

  const handleOnChange = (evt) => {
    const { value } = evt.target

    setIsDisabled(value.trim() === '')
    setValue(evt.target.value)
  }

  const handleOnSubmit = async (evt) => {
    evt.preventDefault()

    const comment = value.trim()
    if (!comment) {
      notifyError('Comment must not be blank')
      return
    }

    setIsDisabled(true)

    try {
      await handleAddComment(comment)

      notifySuccess(`Added "${comment}"`)
      setValue('')
    } catch (error) {
      notifyError(error.message)
    } finally {
      setIsDisabled(false)
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className="blog-comment-form">
      <TextField
        id="blog-comment"
        label="comment"
        size="small"
        value={value}
        onChange={handleOnChange}
      />

      <Button type="submit" variant="contained" disabled={isDisabled}>
        add comment
      </Button>
    </form>
  )
}

export default CommentsForm
