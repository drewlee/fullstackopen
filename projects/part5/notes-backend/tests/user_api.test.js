const { describe, test, before, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { getInitialUsers, usersInDb } = require('./test_helper')

const api = supertest(app)

after(() => {
  mongoose.connection.close()
})

describe('when there is initially one user in db', () => {
  let initialUsers = []

  before(async () => {
    initialUsers = await getInitialUsers()
  })

  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers.slice(0, 1))
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()
    const { name, username, password } = initialUsers[1]

    await api
      .post('/api/users')
      .send({
        name,
        username,
        password,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()
    const { name, password } = initialUsers[1]

    const result = await api
      .post('/api/users')
      .send({
        name,
        username: 'jameskirk',
        password,
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})
