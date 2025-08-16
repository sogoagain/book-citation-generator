import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import NotFoundPage from './NotFoundPage.jsx'

it('NotFoundPage', () => {
  render(<NotFoundPage />)

  expect(screen.getByText(/Not Found/)).toBeInTheDocument()
})
