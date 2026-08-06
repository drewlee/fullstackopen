const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

const addNew = async (anecdote) => {
  const options = {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify(anecdote),
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to post anecdote')
  }

  return await response.json()
}

export default { getAll, addNew }
