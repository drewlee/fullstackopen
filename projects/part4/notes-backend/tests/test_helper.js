const bcrypt = require('bcrypt')
const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const initialUsers = [
  {
    username: 'jameskirk',
    name: 'James T. Kirk',
    password: 'enterprise',
  },
  {
    username: 'spock',
    name: 'Spock',
    password: 'logical',
  },
  {
    username: 'doc_mccoy',
    name: 'Leonard McCoy',
    password: 'bones',
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({}).populate('user', { name: 1, username: 1 })
  return notes.map(note => note.toJSON())
}

const getInitialUsers = async () => {
  return await Promise.all(initialUsers.map(async (user) => {
    return {
      ...user,
      passwordHash: await bcrypt.hash(user.password, 10)
    }
  }))
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  getInitialUsers,
  usersInDb,
}
