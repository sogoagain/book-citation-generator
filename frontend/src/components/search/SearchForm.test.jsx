import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchForm from './SearchForm'

describe('SearchForm', () => {
  const mockOnSearch = vi.fn()

  beforeEach(() => {
    mockOnSearch.mockClear()
  })

  it('renders search input and button', () => {
    render(<SearchForm onSearch={mockOnSearch} refreshCount={0} />)

    expect(screen.getByPlaceholderText('도서 검색')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '도서 검색 실행' })
    ).toBeInTheDocument()
  })

  it('calls onSearch when form is submitted with valid keyword', async () => {
    render(<SearchForm onSearch={mockOnSearch} refreshCount={0} />)

    const input = screen.getByPlaceholderText('도서 검색')
    const submitButton = screen.getByRole('button', { name: '도서 검색 실행' })

    fireEvent.change(input, { target: { value: '테스트 키워드' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('테스트 키워드')
    })
  })

  it('does not call onSearch when keyword is empty', () => {
    render(<SearchForm onSearch={mockOnSearch} refreshCount={0} />)

    const submitButton = screen.getByRole('button', { name: '도서 검색 실행' })
    fireEvent.click(submitButton)

    expect(mockOnSearch).not.toHaveBeenCalled()
  })

  it('does not call onSearch when keyword is only whitespace', () => {
    render(<SearchForm onSearch={mockOnSearch} refreshCount={0} />)

    const input = screen.getByPlaceholderText('도서 검색')
    const submitButton = screen.getByRole('button', { name: '도서 검색 실행' })

    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(submitButton)

    expect(mockOnSearch).not.toHaveBeenCalled()
  })

  it('clears input when refreshCount changes', () => {
    const { rerender } = render(
      <SearchForm onSearch={mockOnSearch} refreshCount={0} />
    )

    const input = screen.getByPlaceholderText('도서 검색')
    fireEvent.change(input, { target: { value: '테스트' } })

    expect(input.value).toBe('테스트')

    rerender(<SearchForm onSearch={mockOnSearch} refreshCount={1} />)

    expect(input.value).toBe('')
  })

  it('submits form on Enter key press', async () => {
    render(<SearchForm onSearch={mockOnSearch} refreshCount={0} />)

    const input = screen.getByPlaceholderText('도서 검색')

    fireEvent.change(input, { target: { value: '테스트 키워드' } })
    fireEvent.submit(input.closest('form'))

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('테스트 키워드')
    })
  })
})
