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

const sortHandler = (a, b) => b.votes - a.votes

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [anecdotes[0]]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result: actionsResult } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await actionsResult.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toStrictEqual(mockAnecdotes)
  })

  it('returns anecdotes sorted by votes', async () => {
    const sortedAnecdotes = anecdotes.toSorted(sortHandler)
    anecdoteService.getAll.mockResolvedValue(anecdotes)

    const { result: actionsResult } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await actionsResult.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toStrictEqual(sortedAnecdotes)
  })

  it('returns a filtered array of anecdotes', async () => {
    const filter = 'third'
    anecdoteService.getAll.mockResolvedValue(anecdotes)

    const { result: actionsResult } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      actionsResult.current.initialize()
      actionsResult.current.setFilter(filter)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())

    expect(useAnecdoteStore.getState().filter).toBe(filter)
    expect(anecdotesResult.current).toStrictEqual([anecdotes[2]])
  })

  it('increments the vote count for an anecdote', async () => {
    const mockAnecdote = anecdotes[1]

    anecdoteService.getAll.mockResolvedValue(anecdotes)
    anecdoteService.update.mockResolvedValue({ ...mockAnecdote, votes: mockAnecdote.votes + 1 })

    const { result: actionsResult } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await actionsResult.current.initialize()
      await actionsResult.current.addVote(mockAnecdote.id)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    const updatedAnecdote = anecdotesResult.current.find((a) => a.id === mockAnecdote.id)

    expect(updatedAnecdote.votes).toBe(mockAnecdote.votes + 1)
  })

  it('can add a new anecdote', async () => {
    const newAnecdote = { id: '5', content: 'The fifth anecdote', votes: 0 }

    anecdoteService.getAll.mockResolvedValue(anecdotes)
    anecdoteService.addNew.mockResolvedValue(newAnecdote)

    const { result: actionsResult } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await actionsResult.current.initialize()
      await actionsResult.current.addNew(newAnecdote.content)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current.find((a) => a.id === newAnecdote.id)).toStrictEqual(newAnecdote)
  })

  it('can remove an anecdote', async () => {
    const removeId = '3'

    anecdoteService.getAll.mockResolvedValue(anecdotes)
    anecdoteService.remove.mockResolvedValue()

    const { result: actionsResult } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await actionsResult.current.initialize()
      await actionsResult.current.remove(removeId)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current.map((a) => a.id)).not.toContain(removeId)
  })
})
