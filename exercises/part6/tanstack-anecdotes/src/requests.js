const baseUrl = 'http://localhost:3001/anecdotes'

export async function getAnecdotes() {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

export async function addAnecdote(newAnecdote) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }

  const response = await fetch(baseUrl, options)
  if (!response.ok) {
    throw new Error('Failed to post anecdote')
  }

  return await response.json()
}
