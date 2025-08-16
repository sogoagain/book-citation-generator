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

  return {
    getLinkByName: name => screen.getByRole('link', { name }),
    getButtonByName: name => screen.getByRole('button', { name }),
    getSearchInput: () => screen.getByPlaceholderText(/도서 검색/),
  }
}

describe('<App />', () => {
  it('renders header', () => {
    renderApp()

    expect(
      screen.getByRole('heading', { name: /도서 학술 출처 생성기/ })
    ).toBeInTheDocument()
  })

  it('renders search form', () => {
    const { getButtonByName, getSearchInput } = renderApp()

    expect(getSearchInput()).toBeInTheDocument()
    expect(getButtonByName(/검색/)).toBeInTheDocument()
  })

  it('has accessibility features', () => {
    renderApp()

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByRole('search')).toBeInTheDocument()
    expect(screen.getByText('메인 콘텐츠로 바로가기')).toBeInTheDocument()
  })

  it('renders footer', () => {
    renderApp()

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByText(/APA 7판 · MLA 9판 지원/)).toBeInTheDocument()
  })
})
