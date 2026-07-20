const express = require('express')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(MONGODB_URI, { family: 4 })

app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

module.exports = app
