import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Header from './Header'

it('Header', () => {
  render(<Header />)

  expect(screen.getByText(/도서 학술 출처 생성기/)).toBeInTheDocument()
})
