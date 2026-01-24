import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchResult from './SearchResult'

describe('SearchResult', () => {
  const mockOnChange = vi.fn()

  const mockBooks = [
    {
      isbn: '1234567890',
      title: '테스트 도서 1',
      authors: ['작가1'],
      publisher: '출판사1',
      datetime: '2023-01-01T00:00:00Z',
      thumbnail: 'https://example.com/image1.jpg',
    },
    {
      isbn: '0987654321',
      title: '테스트 도서 2',
      authors: ['작가2', '작가3'],
      publisher: '출판사2',
      datetime: '2023-02-01T00:00:00Z',
    },
  ]

  const defaultPagination = {
    page: 1,
    size: 10,
    total: 25,
  }

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders search results with book items', () => {
    render(
      <SearchResult
        dataSource={mockBooks}
        pagination={defaultPagination}
        onChange={mockOnChange}
      />
    )

    expect(screen.getByText('25건')).toBeInTheDocument()
    expect(screen.getByText('테스트 도서 1')).toBeInTheDocument()
    expect(screen.getByText('테스트 도서 2')).toBeInTheDocument()
  })

  it('displays pagination when results exceed page size', () => {
    render(
      <SearchResult
        dataSource={mockBooks}
        pagination={defaultPagination}
        onChange={mockOnChange}
      />
    )

    expect(
      screen.getByRole('navigation', { name: '검색 결과 페이지네이션' })
    ).toBeInTheDocument()
  })

  it('does not display pagination when results fit in one page', () => {
    const smallPagination = { ...defaultPagination, total: 5 }
    render(
      <SearchResult
        dataSource={mockBooks}
        pagination={smallPagination}
        onChange={mockOnChange}
      />
    )

    expect(
      screen.queryByRole('navigation', { name: '검색 결과 페이지네이션' })
    ).not.toBeInTheDocument()
  })

  it('expands citation panel when book item is clicked', () => {
    render(
      <SearchResult
        dataSource={mockBooks}
        pagination={defaultPagination}
        onChange={mockOnChange}
      />
    )

    fireEvent.click(screen.getByText('테스트 도서 1'))

    expect(screen.getByText(/참고문헌/)).toBeInTheDocument()
    expect(screen.getByText(/본문 내 인용/)).toBeInTheDocument()
  })

  it('collapses previous item when another is clicked', () => {
    render(
      <SearchResult
        dataSource={mockBooks}
        pagination={defaultPagination}
        onChange={mockOnChange}
      />
    )

    fireEvent.click(screen.getByText('테스트 도서 1'))
    expect(screen.getByText(/참고문헌/)).toBeInTheDocument()

    fireEvent.click(screen.getByText('테스트 도서 2'))
    expect(screen.getAllByText(/참고문헌/).length).toBe(1)
  })

  it('renders empty state when no books provided', () => {
    render(
      <SearchResult
        dataSource={[]}
        pagination={defaultPagination}
        onChange={mockOnChange}
      />
    )

    expect(screen.getByText('검색 결과가 없습니다')).toBeInTheDocument()
    expect(screen.getByText('다른 키워드로 검색해보세요.')).toBeInTheDocument()
  })

  it('renders empty state when dataSource is null', () => {
    render(
      <SearchResult
        dataSource={null}
        pagination={defaultPagination}
        onChange={mockOnChange}
      />
    )

    expect(screen.getByText('검색 결과가 없습니다')).toBeInTheDocument()
  })
})
