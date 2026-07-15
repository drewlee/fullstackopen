const express = require('express')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const app = express()

mongoose.set('strictQuery', false)

mongoose.connect(MONGODB_URI, { family: 4 })
  .then(() => logger.info('Connected to MongoDB'))
  .catch(error => logger.info(`Error connecting to MongoDB: ${error.message}`))

app.use(express.static('public'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
