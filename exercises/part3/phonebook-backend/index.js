require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const PORT = process.env.PORT || 3001
const app = express()

morgan.token('data', (request, response) => {
  if (request.body) {
    return JSON.stringify(request.body)
  }
})

app.use(express.static('public'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/info', (request, response) => {
  const numPersons = Person.countDocuments({}).then(numPersons => {
    const pNoun = numPersons === 1 ? 'person' : 'people'
    const date = new Date()

    response.send(
      `<p>Phonebook has info for ${numPersons} ${pNoun}</p><p>${date.toString()}</p>`
    )
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

app.post('/api/persons', (request, response) => {
  const { body } = request
  const required = ['name', 'number']

  for (const prop of required) {
    if (!body[prop]) {
      return response.status(400).json({
        error: `missing required '${prop}' property`
      })
    }
  }

  const { name, number } = body
  const person = new Person({
    name,
    number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  }).catch(error => {
    response.status(404).end()
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
