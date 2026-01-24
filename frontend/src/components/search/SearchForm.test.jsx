import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchForm from './SearchForm'

describe('SearchForm', () => {
  const mockOnSearch = vi.fn()

  beforeEach(() => {
    mockOnSearch.mockClear()
  })

  it('renders search input and button', () => {
    render(<SearchForm onSearch={mockOnSearch} />)

    expect(
      screen.getByPlaceholderText('도서 제목, 저자, 출판사')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /검색/ })).toBeInTheDocument()
  })

  it('calls onSearch when form is submitted with valid keyword', () => {
    render(<SearchForm onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('도서 제목, 저자, 출판사')
    fireEvent.change(input, { target: { value: '테스트 키워드' } })
    fireEvent.submit(input.closest('form'))

    expect(mockOnSearch).toHaveBeenCalledWith('테스트 키워드')
  })

  it('does not call onSearch when keyword is empty', () => {
    render(<SearchForm onSearch={mockOnSearch} />)

    const submitButton = screen.getByRole('button', { name: /검색/ })
    fireEvent.click(submitButton)

    expect(mockOnSearch).not.toHaveBeenCalled()
  })

  it('shows error when submitting empty input', () => {
    render(<SearchForm onSearch={mockOnSearch} />)

    fireEvent.click(screen.getByRole('button', { name: /검색/ }))

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(
      screen.getByText('검색할 도서 정보를 입력해주세요')
    ).toBeInTheDocument()
  })

  it('does not call onSearch when keyword is only whitespace', () => {
    render(<SearchForm onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('도서 제목, 저자, 출판사')
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.submit(input.closest('form'))

    expect(mockOnSearch).not.toHaveBeenCalled()
  })

  it('shows clear button when input has value', () => {
    render(<SearchForm onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('도서 제목, 저자, 출판사')
    fireEvent.change(input, { target: { value: '테스트' } })

    expect(
      screen.getByRole('button', { name: '검색어 지우기' })
    ).toBeInTheDocument()
  })

  it('clears input when clear button clicked', () => {
    render(<SearchForm onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('도서 제목, 저자, 출판사')
    fireEvent.change(input, { target: { value: '테스트' } })
    fireEvent.click(screen.getByRole('button', { name: '검색어 지우기' }))

    expect(input.value).toBe('')
  })
})
