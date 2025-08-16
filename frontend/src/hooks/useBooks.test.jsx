import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useBooks } from './useBooks'

global.fetch = vi.fn()

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        cacheTime: 0,
      },
    },
  })
  const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  Wrapper.displayName = 'QueryWrapper'
  return Wrapper
}

describe('useBooks', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('fetches books successfully', async () => {
    const mockResponse = {
      documents: [
        {
          title: '테스트 도서',
          authors: ['작가1'],
          isbn: '1234567890',
        },
      ],
      meta: {
        total_count: 1,
        is_end: true,
      },
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => useBooks('테스트', 1, 10), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockResponse)
    expect(fetch).toHaveBeenCalledTimes(1)

    const fetchCall = fetch.mock.calls[0][0]
    expect(fetchCall.toString()).toBe(
      'http://localhost:4000/books?keyword=%ED%85%8C%EC%8A%A4%ED%8A%B8&page=1&size=10'
    )
  })

  it('does not fetch when keyword is empty', () => {
    renderHook(() => useBooks('', 1, 10), {
      wrapper: createWrapper(),
    })

    expect(fetch).not.toHaveBeenCalled()
  })

  it('handles API errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' }),
    })

    const { result } = renderHook(() => useBooks('테스트', 1, 10), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true), {
      timeout: 3000,
    })

    expect(result.current.error).toBeTruthy()
  })
})
