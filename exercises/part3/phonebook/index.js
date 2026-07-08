const express = require('express')

const PORT = 3001
const app = express()
let persons = [
  { 
    'id': '1',
    'name': 'Arto Hellas', 
    'number': '040-123456'
  },
  { 
    'id': '2',
    'name': 'Ada Lovelace', 
    'number': '39-44-5323523'
  },
  { 
    'id': '3',
    'name': 'Dan Abramov', 
    'number': '12-43-234345'
  },
  { 
    'id': '4',
    'name': 'Mary Poppendieck', 
    'number': '39-23-6423122'
  }
]

app.use(express.json())

app.get('/info', (request, response) => {
  const numPersons = persons.length
  const pNoun = numPersons === 1 ? 'person' : 'people'
  const date = new Date()

  response.send(
    `<p>Phonebook has info for ${numPersons} ${pNoun}</p><p>${date.toString()}</p>`
  )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
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
  const dupeName = persons.find(person => person.name === name)

  if (dupeName) {
    return response.status(400).json({
      error: `name '${name}' already exists`
    })
  }

  const id = Math.floor(Math.random() * 1000).toString()

  persons.push({ id, name, number })

  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(entry => entry.id === id)

  if (!person) {
    response.status(404).end()
  }

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3001`)
})
