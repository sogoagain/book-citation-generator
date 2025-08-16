import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import BookDetailContainer from './BookDetailContainer'

import BOOK from '../__fixtures__/book'

global.document.queryCommandSupported = vi.fn().mockReturnValue(true)

describe('BookDetailContainer', () => {
  it('renders description', () => {
    render(<BookDetailContainer book={BOOK} />)

    expect(screen.getAllByText(/실용주의 프로그래머/).length).toBeGreaterThan(0)
  })

  it('renders copy button', () => {
    render(<BookDetailContainer book={BOOK} />)

    expect(screen.getByText(/복사/)).toBeInTheDocument()
  })
})
