import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import BookDetailPage from './BookDetailPage'
import { useAppStore } from '../store/useAppStore'

vi.mock('../store/useAppStore')
vi.mock('../containers/BookDetailContainer.jsx', () => ({
  default: ({ book }) => (
    <div data-testid='book-detail-container'>Book Detail for: {book.title}</div>
  ),
}))

const renderWithRouter = (initialEntry = '/book/1234567890') => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path='/book/:bookId' element={<BookDetailPage />} />
        <Route path='/' element={<div>Home Page</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('BookDetailPage', () => {
  const mockBook = {
    isbn: '1234567890',
    title: '테스트 도서',
    authors: ['작가1'],
    publisher: '출판사1',
    datetime: '2023-01-01T00:00:00Z',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders BookDetailContainer when book detail is visible and matches bookId', () => {
    useAppStore.mockReturnValue({
      bookDetail: {
        visible: true,
        book: mockBook,
      },
    })

    renderWithRouter()

    expect(screen.getByTestId('book-detail-container')).toBeInTheDocument()
    expect(screen.getByText('Book Detail for: 테스트 도서')).toBeInTheDocument()
  })

  it('redirects to home when book detail is not visible', () => {
    useAppStore.mockReturnValue({
      bookDetail: {
        visible: false,
        book: null,
      },
    })

    renderWithRouter()

    expect(screen.getByText('Home Page')).toBeInTheDocument()
    expect(
      screen.queryByTestId('book-detail-container')
    ).not.toBeInTheDocument()
  })

  it('redirects to home when book is null', () => {
    useAppStore.mockReturnValue({
      bookDetail: {
        visible: true,
        book: null,
      },
    })

    renderWithRouter()

    expect(screen.getByText('Home Page')).toBeInTheDocument()
    expect(
      screen.queryByTestId('book-detail-container')
    ).not.toBeInTheDocument()
  })

  it('redirects to home when book ISBN does not match URL parameter', () => {
    useAppStore.mockReturnValue({
      bookDetail: {
        visible: true,
        book: { ...mockBook, isbn: 'different-isbn' },
      },
    })

    renderWithRouter()

    expect(screen.getByText('Home Page')).toBeInTheDocument()
    expect(
      screen.queryByTestId('book-detail-container')
    ).not.toBeInTheDocument()
  })
})
