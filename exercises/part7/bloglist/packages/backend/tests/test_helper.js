const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const getInitialUsers = async () => {
  return await Promise.all(initialUsers.map(async (user) => {
    return {
      ...user,
      passwordHash: await bcrypt.hash(user.password, 10)
    }
  }))
}

const getAuthToken = user => {
  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  return token
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  getInitialUsers,
  getAuthToken,
}
