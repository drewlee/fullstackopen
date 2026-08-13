const process = require('node:process')
const path = require('node:path')
const express = require('express')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./config')
const { tokenExtractor, userExtractor } = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const testingRouter = require('./controllers/testing')

const app = express()

mongoose.connect(MONGODB_URI, { family: 4 })

app.use(express.json())
app.use(tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', userExtractor, blogsRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')))
  app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'))
  })
}

module.exports = app
