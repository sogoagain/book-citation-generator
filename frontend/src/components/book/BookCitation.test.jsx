import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import BookCitation from './BookCitation'

describe('BookCitation', () => {
  const inputRef = vi.fn()
  const handleCopy = vi.fn()

  function renderBookCitation(
    { label, citation, copyable } = { label: '', citation: '', copyable: true }
  ) {
    render(
      <BookCitation
        label={label}
        citation={citation}
        onCopy={handleCopy}
        copyable={copyable}
        inputRef={inputRef}
      />
    )
  }

  it('renders citation', () => {
    const label = 'MLA'
    const citation =
      '앤드류 헌트, 데이비드 토머스. 실용주의 프로그래머. 인사이트, 2014.'

    renderBookCitation({ label, citation })

    expect(screen.getByLabelText(label).value).toBe(citation)
  })

  describe('when copying is possible', () => {
    it('renders copy button', () => {
      renderBookCitation()

      fireEvent.click(screen.getByText(/복사/))
      expect(handleCopy).toBeCalled()
    })
  })

  describe('when copying is impossible', () => {
    it("doesn't render copy button", () => {
      renderBookCitation({ copyable: false })

      expect(screen.queryByText(/복사/)).toBeNull()
    })
  })
})
