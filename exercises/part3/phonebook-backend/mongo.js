const mongoose = require('mongoose')

const args = process.argv.slice(2)

if (!args.length) {
  console.log('Password required as first argument')
  process.exit(1)
} else if (args.length === 2) {
  console.log('Name and phone number are required')
  process.exit(1)
}

const password = args[0];
const url = `mongodb+srv://starsthatfell_db_user:${password}@cluster0.giv0msd.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (args.length === 1) {
  Person.find({}).then(persons => {
    console.log('Phonebook:')

    persons.forEach(person => {
      console.log(`- ${person.name} ${person.number}`)
    })

    mongoose.connection.close()
  })
} else {
  const [name, number] = args.slice(1)
  const person = new Person({ name, number })

  person.save().then(result => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close()
  })
}
