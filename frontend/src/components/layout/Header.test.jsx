import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Header from './Header'

it('Header renders title and subtitle', () => {
  render(<Header />)

  expect(screen.getByText(/도서 인용 생성기/)).toBeInTheDocument()
  expect(screen.getByText('APA 7th Edition')).toBeInTheDocument()
})
