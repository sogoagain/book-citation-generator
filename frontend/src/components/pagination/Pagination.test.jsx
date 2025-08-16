import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from './Pagination'

describe('Pagination', () => {
  const mockOnChange = vi.fn()

  const defaultPagination = {
    page: 2,
    size: 10,
    total: 50,
  }

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders pagination buttons correctly', () => {
    render(
      <Pagination pagination={defaultPagination} onChange={mockOnChange} />
    )

    expect(screen.getByRole('button', { name: '<' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '>' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
  })

  it('calls onChange when previous button is clicked', () => {
    render(
      <Pagination pagination={defaultPagination} onChange={mockOnChange} />
    )

    fireEvent.click(screen.getByRole('button', { name: '<' }))
    expect(mockOnChange).toHaveBeenCalledWith(1)
  })

  it('calls onChange when next button is clicked', () => {
    render(
      <Pagination pagination={defaultPagination} onChange={mockOnChange} />
    )

    fireEvent.click(screen.getByRole('button', { name: '>' }))
    expect(mockOnChange).toHaveBeenCalledWith(3)
  })

  it('calls onChange when page number is clicked', () => {
    render(
      <Pagination pagination={defaultPagination} onChange={mockOnChange} />
    )

    fireEvent.click(screen.getByRole('button', { name: '3' }))
    expect(mockOnChange).toHaveBeenCalledWith(3)
  })

  it('disables previous button on first page', () => {
    const firstPagePagination = { ...defaultPagination, page: 1 }
    render(
      <Pagination pagination={firstPagePagination} onChange={mockOnChange} />
    )

    const prevButton = screen.getByRole('button', { name: '<' })
    expect(prevButton).toBeDisabled()
  })

  it('disables next button on last page', () => {
    const lastPagePagination = { ...defaultPagination, page: 5, total: 50 }
    render(
      <Pagination pagination={lastPagePagination} onChange={mockOnChange} />
    )

    const nextButton = screen.getByRole('button', { name: '>' })
    expect(nextButton).toBeDisabled()
  })

  it('highlights current page', () => {
    render(
      <Pagination pagination={defaultPagination} onChange={mockOnChange} />
    )

    const currentPageButton = screen.getByRole('button', { name: '2' })
    expect(currentPageButton).toHaveClass('bg-indigo-600')
  })
})
