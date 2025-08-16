import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import BookWriters from './BookWriters'

import BOOK from '../../__fixtures__/book'

describe('BookWriters', () => {
  function renderBookWriters() {
    render(<BookWriters title={BOOK.title} writers={BOOK.authors} />)
  }

  it('renders writers', () => {
    renderBookWriters()

    expect(screen.getByText(/앤드류 헌트, 데이비드 토머스/)).toBeInTheDocument()
  })
})
