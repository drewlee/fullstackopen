const { test, after, before, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const {
  initialBlogs,
  blogsInDb,
  getInitialUsers,
  usersInDb,
  getAuthToken,
} = require('./test_helper')

const api = supertest(app)
let initialUsers = []

after(async () => {
  await mongoose.connection.close()
})

describe('blog API', () => {
  before(async () => {
    initialUsers = await getInitialUsers()
  })

  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    await User.insertMany(initialUsers)

    const users = await usersInDb()
    const blogsWithUsers = initialBlogs.map(blog => {
      blog.user = users[0].id
      return blog
    })

    await Blog.insertMany(blogsWithUsers)
  })

  describe('fetch all', () => {
    test('blogs are returned as JSON', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('returns all blogs in the db', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('returned blogs include the expected properties', async () => {
      const response = await api.get('/api/blogs')
      const blog = response.body[0]
      const props = ['id', 'title', 'author', 'url', 'likes', 'user']

      assert.deepEqual(Object.keys(blog).length, props.length)
      props.forEach(prop => assert(prop in blog))
    })
  })

  describe('create new', () => {
    test('succeeds with valid data', async () => {
      const users = await usersInDb()
      const token = getAuthToken(users[1])
      const blog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await blogsInDb()
      assert.strictEqual(blogs.length, initialBlogs.length + 1)

      const content = blogs.map((blog) => blog.title)
      assert(content.includes('First class tests'))
    })

    test('new blog includes the expected properties', async () => {
      const users = await usersInDb()
      const token = getAuthToken(users[1])
      const blog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        likes: 10,
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)

      const props = ['id', 'title', 'author', 'url', 'likes', 'user']

      assert.deepEqual(Object.keys(response.body).length, props.length)
      props.forEach(prop => assert(prop in response.body))
    })

    test('defaults likes to 0 if not provided', async () => {
      const users = await usersInDb()
      const token = getAuthToken(users[1])
      const blog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await blogsInDb()
      const newBlog = blogs.find(blog => blog.title === 'First class tests')

      assert.strictEqual(newBlog.likes, 0)
    })

    test('fails with status 400 if title is missing', async () => {
      const users = await usersInDb()
      const token = getAuthToken(users[1])
      const blog = {
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        like: 1,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const blogs = await blogsInDb()
      assert.strictEqual(blogs.length, initialBlogs.length)
    })

    test('fails with status 400 if url is missing', async () => {
      const users = await usersInDb()
      const token = getAuthToken(users[1])
      const blog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        like: 1,
        user: users[1].id,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const blogs = await blogsInDb()
      assert.strictEqual(blogs.length, initialBlogs.length)
    })
  })

  describe('update', () => {
    test('succeeds with valid data', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ ...blogToUpdate, likes: blogToUpdate.likes + 1 })
        .expect(201)

      const blogsAtEnd = await blogsInDb()
      const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

      assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1)
    })
  })

  describe('delete', () => {
    test('succeeds if id is valid', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await blogsInDb()
      const ids = blogsAtEnd.map(n => n.id)

      assert(!ids.includes(blogToDelete.id))
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
    })
  })
})
