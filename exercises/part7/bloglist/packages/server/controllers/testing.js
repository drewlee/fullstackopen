const testingRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

testingRouter.post('/reset', async (response, request) => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  request.status(204).end()
})

module.exports = testingRouter
