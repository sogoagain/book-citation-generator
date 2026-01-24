import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Footer from './Footer'

it('Footer renders disclaimer', () => {
  render(<Footer />)

  expect(
    screen.getByText(/생성된 인용문은 검토 후 사용하세요/)
  ).toBeInTheDocument()
})
