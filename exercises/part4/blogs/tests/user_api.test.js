const { test, after, before, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { getInitialUsers, usersInDb } = require('./test_helper')

const api = supertest(app)
let initialUsers = []

after(async () => {
  await mongoose.connection.close()
})

describe('user API', () => {
  before(async () => {
    initialUsers = await getInitialUsers()
  })

  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
  })

  describe('fetching users', () => {
    test('users are returned as JSON', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all users are returned', async () => {
      const result = await api.get('/api/users')
      assert.strictEqual(result.body.length, initialUsers.length)
    })
  })

  describe('adding a new user', () => {
    test('successfully creates a new user', async () => {
      const newUser = {
        username: 'scotty',
        name: 'Montgomery Scott',
        password: 'beam_me_up',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
      
      const users = await usersInDb()
      assert.strictEqual(users.length, initialUsers.length + 1)
      assert(users.map(u => u.username).includes(newUser.username))
    })

    test('fails username validation', async () => {
      const newUser = {
        username: 'sc',
        name: 'Montgomery Scott',
        password: 'beam_me_up',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const users = await usersInDb()
      assert.strictEqual(users.length, initialUsers.length)
      assert(response.body.error.includes('User validation failed'))
    })

    test('fails password validation', async () => {
      const newUser = {
        username: 'scotty',
        name: 'Montgomery Scott',
        password: 'be',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const users = await usersInDb()
      assert.strictEqual(users.length, initialUsers.length)
      assert(response.body.error)
    })
  })
})
