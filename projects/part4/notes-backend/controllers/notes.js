const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  if (!note) {
    response.status(404).end()
    return
  }

  response.json(note)
})

notesRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)

  if (!user) {
    response.status(400).json({ error: 'userId missing or not valid' })
    return
  }

  const note = new Note({
    content: body.content,
    important: body.important ?? false,
    user: user._id,
  })

  const savedNote = await note.save()
  user.notes.push(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id).then(note => {
    if (!note) {
      response.status(404).end()
      return
    }

    note.content = content
    note.important = important

    return note.save()
  }).then(updatedNote => {
    if (updatedNote) {
      response.json(updatedNote)
    }
  }).catch(error => next(error))
})

module.exports = notesRouter
