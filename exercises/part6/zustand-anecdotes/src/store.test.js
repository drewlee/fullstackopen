import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    addNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from './store'

const anecdotes = [
  { id: '1', content: 'The first anecdote', votes: 0 },
  { id: '2', content: 'The second anecdote', votes: 1 },
  { id: '3', content: 'The third anecdote', votes: 7 },
  { id: '4', content: 'The fourth anecdote', votes: 3 },
]

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = anecdotes.slice(0, 1)
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result: actionsResult } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await actionsResult.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toStrictEqual(mockAnecdotes)
  })

  it('returns anecdotes sorted by votes', async () => {
    const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)
    anecdoteService.getAll.mockResolvedValue(anecdotes)

    const { result: actionsResult } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await actionsResult.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toStrictEqual(sortedAnecdotes)
  })
})
