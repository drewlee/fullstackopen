const baseUrl = 'http://localhost:3001/anecdotes'

export async function getAnecdotes() {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return response.json()
}
