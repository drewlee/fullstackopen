const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { user } = request

  if (!user || !user.id) {
    response.status(401).json({ error: 'Invalid token' })
    return
  }

  const foundUser = await User.findById(user.id)

  if (!foundUser) {
    response.status(400).json({ error: 'Missing or invalid user id' })
    return
  }

  const { body } = request
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
    user: foundUser._id,
  })

  try {
    const savedBlog = await blog.save()
    foundUser.blogs.push(savedBlog._id)
    savedBlog.populate('user', { username: 1, name: 1 })
    await foundUser.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(400).json({ error: 'Invalid blog id' })
    return
  }

  const { user } = request

  if (!user || !user.id || blog.user.toString() !== user.id) {
    response.status(401).json({ error: 'Invalid token' })
    return
  }

  await blog.deleteOne()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).end()
    return
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const updatedBlog = await blog.save()
  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter
