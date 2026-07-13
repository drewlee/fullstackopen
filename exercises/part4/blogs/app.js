const express = require('express')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(MONGODB_URI, { family: 4 })

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
