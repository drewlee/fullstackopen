const { test, after, before, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { getInitialUsers } = require('./test_helper')

const api = supertest(app)

after(() => {
  mongoose.connection.close()
})

describe('when there are some initial users in the db for login', () => {
  let initialUsers = []

  before(async () => {
    initialUsers = await getInitialUsers()
  })

  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
  })

  test('successful with valid credentials', async () => {
    const user = initialUsers[0]

    const response = await api
      .post('/api/login')
      .send({
        username: user.username,
        password: user.password,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { body } = response

    assert.strictEqual(body.username, user.username)
    assert.strictEqual(body.name, user.name)
    assert(body.token)
  })

  test('unsuccessful for a non-registered user name', async () => {
    const user = initialUsers[0]

    const response = await api
      .post('/api/login')
      .send({
        username: 'not_registered',
        password: user.password,
      })
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(response.body, { error: 'invalid username or password' })
  })

  test('unsuccessful for an invalid password', async () => {
    const user = initialUsers[0]

    const response = await api
      .post('/api/login')
      .send({
        username: user.username,
        password: 'invalid',
      })
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(response.body, { error: 'invalid username or password' })
  })
})
