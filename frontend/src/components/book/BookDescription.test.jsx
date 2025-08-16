import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import BookDescription from './BookDescription'

import BOOK from '../../__fixtures__/book'

describe('BookDescription', () => {
  function renderBookDescription() {
    render(<BookDescription book={BOOK} />)
  }

  it('renders description', () => {
    renderBookDescription()

    expect(screen.getAllByText(/실용주의 프로그래머/).length).toBeGreaterThan(0)
    expect(screen.getByText(/앤드류 헌트/)).toBeInTheDocument()
    expect(screen.getByText(/김창준/)).toBeInTheDocument()
  })
})
