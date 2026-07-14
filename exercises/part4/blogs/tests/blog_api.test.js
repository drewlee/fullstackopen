const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { initialBlogs, blogsInDb } = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

after(async () => {
  await mongoose.connection.close()
})

describe('blog API', () => {
  describe('fetching blogs', () => {
    test('blogs are returned as JSON', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('returned blogs include the id', async () => {
      const response = await api.get('/api/blogs')
      const blogs = response.body

      assert(blogs.every(blog => Object.hasOwn(blog, 'id')))
    })
  })

  describe('adding a new blog', () => {
    test('succeeds with valid data', async () => {
      const blog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await blogsInDb()
      assert.strictEqual(blogs.length, initialBlogs.length + 1)

      const content = blogs.map((blog) => blog.title)
      assert(content.includes('First class tests'))
    })

    test('defaults likes to 0 if not provided', async () => {
      const blog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      }

      await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await blogsInDb()
      const newBlog = blogs.find(blog => blog.title === 'First class tests')

      assert.strictEqual(newBlog.likes, 0)
    })

    test('fails with status 400 if title is missing', async () => {
      const blog = {
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        like: 1,
      }

      await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const blogs = await blogsInDb()
      assert.strictEqual(blogs.length, initialBlogs.length)
    })

    test('fails with status 400 if url is missing', async () => {
      const blog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        like: 1,
      }

      await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      const blogs = await blogsInDb()
      assert.strictEqual(blogs.length, initialBlogs.length)
    })
  })

  describe('deleting a note', () => {
    test('succeeds with status 204 if id is valid', async () => {
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
