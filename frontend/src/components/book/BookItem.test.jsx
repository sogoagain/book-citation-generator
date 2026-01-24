import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import BookItem from './BookItem'
import BOOK from '../../__fixtures__/book'

describe('BookItem', () => {
  const handleToggle = vi.fn()

  function renderBookItem(expanded = false) {
    render(<BookItem book={BOOK} expanded={expanded} onToggle={handleToggle} />)
  }

  it('renders book info', () => {
    renderBookItem()

    expect(
      screen.getByRole('heading', { name: /실용주의 프로그래머/ })
    ).toBeInTheDocument()
    expect(screen.getByText(/앤드류 헌트/)).toBeInTheDocument()
    expect(screen.getByText(/인사이트/)).toBeInTheDocument()
  })

  it('shows translator info', () => {
    renderBookItem()

    expect(screen.getByText(/김창준/)).toBeInTheDocument()
  })

  it('calls onToggle when clicked', () => {
    renderBookItem()

    fireEvent.click(screen.getByRole('button'))
    expect(handleToggle).toHaveBeenCalledWith(BOOK)
  })

  it('shows citation panel when expanded', () => {
    renderBookItem(true)

    expect(screen.getByText(/참고문헌/)).toBeInTheDocument()
    expect(screen.getByText(/본문 내 인용/)).toBeInTheDocument()
  })

  it('hides citation panel when collapsed', () => {
    renderBookItem(false)

    expect(screen.queryByText(/참고문헌/)).not.toBeInTheDocument()
  })

  it('has aria-expanded attribute', () => {
    renderBookItem(true)

    expect(
      screen.getByRole('button', { name: /실용주의 프로그래머 인용 생성/ })
    ).toHaveAttribute('aria-expanded', 'true')
  })
})
