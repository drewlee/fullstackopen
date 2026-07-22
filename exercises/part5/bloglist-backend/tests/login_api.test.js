const { describe, test, after, before, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { getInitialUsers } = require('./test_helper')

const api = supertest(app)
let initialUsers = []

after(async () => {
  await mongoose.connection.close()
})

describe('login API', () => {
  before(async () => {
    initialUsers = await getInitialUsers()
  })

  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
  })

  test('successful login with valid credentials', async () => {
    const { username, password } = initialUsers[1]
    const user = {
      username,
      password,
    }

    await api.post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('responds with the expected properties', async () => {
    const { username, password, name } = initialUsers[1]
    const user = {
      username,
      password,
    }

    const response = await api.post('/api/login').send(user)
    const props = ['name', 'username', 'token']

    assert.strictEqual(Object.keys(response.body).length, props.length)
    props.forEach(prop => assert(prop in response.body))
    assert.strictEqual(response.body.name, name)
    assert.strictEqual(response.body.username, username)
  })

  test('responds with error for invalid username', async () => {
    const { username, password } = initialUsers[1]
    const user = {
      ...initialUsers[1],
      username: 'scotty',
    }
    delete user.passwordHash

    const response = await api.post('/api/login')
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(response.body.error.includes('invalid'))
  })

  test('responds with error for invalid password', async () => {
    const { username, password } = initialUsers[1]
    const user = {
      ...initialUsers[1],
      password: 'beam_me_up',
    }
    delete user.passwordHash

    const response = await api.post('/api/login')
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(response.body.error.includes('invalid'))
  })
})
