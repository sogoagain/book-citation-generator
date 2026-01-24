import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from './test/setup.jsx'

import App from './App'

function renderApp() {
  render(
    <TestWrapper>
      <App />
    </TestWrapper>
  )
}

describe('<App />', () => {
  it('renders header with title', () => {
    renderApp()

    expect(
      screen.getByRole('heading', { name: /도서 인용 생성기/ })
    ).toBeInTheDocument()
  })

  it('renders search form', () => {
    renderApp()

    expect(
      screen.getByPlaceholderText(/도서 제목, 저자, 출판사/)
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /검색/ })).toBeInTheDocument()
  })

  it('has semantic structure', () => {
    renderApp()

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByRole('search')).toBeInTheDocument()
  })

  it('shows APA 7th Edition label', () => {
    renderApp()

    expect(screen.getByText('APA 7th Edition')).toBeInTheDocument()
  })
})
