import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Footer from './Footer'

describe('Footer', () => {
  it('renders copyright information', () => {
    render(<Footer />)

    expect(screen.getByText(/학술 출처 생성기/)).toBeInTheDocument()
    expect(screen.getByText(/APA 7판 · MLA 9판 지원/)).toBeInTheDocument()
  })

  it('renders citation formats', () => {
    render(<Footer />)

    expect(screen.getByText(/APA 7판/)).toBeInTheDocument()
    expect(screen.getByText(/MLA 9판/)).toBeInTheDocument()
  })
})
