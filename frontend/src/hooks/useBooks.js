import { useQuery } from '@tanstack/react-query'

const API_BASE_URL =
  import.meta.env.VITE_BOOK_API_URL || 'http://localhost:4000'

const fetchBooks = async ({ keyword, page = 1, size = 10 }) => {
  if (!keyword) {
    throw new Error('Keyword is required')
  }

  const url = new URL(`${API_BASE_URL}/books`)
  url.searchParams.append('keyword', keyword)
  url.searchParams.append('page', page.toString())
  url.searchParams.append('size', size.toString())

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export const useBooks = (keyword, page = 1, size = 10) => {
  return useQuery({
    queryKey: ['books', keyword, page, size],
    queryFn: () => fetchBooks({ keyword, page, size }),
    enabled: !!keyword,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
