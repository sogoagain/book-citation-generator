import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import BookItem from './BookItem';

import BOOK from '../../__fixtures__/book';

describe('BookItem', () => {
  const handleClick = jest.fn();

  function renderBookItem() {
    render(<BookItem
      tabIndex={0}
      book={BOOK}
      onClick={handleClick}
    />);
  }

  beforeEach(() => {
    handleClick.mockClear();
  });

  it('renders description', () => {
    renderBookItem();

    expect(screen.getByText(/실용주의 프로그래머/)).toBeInTheDocument();
    expect(screen.getByText(/앤드류 헌트/)).toBeInTheDocument();
    expect(screen.getByText(/김창준/)).toBeInTheDocument();
  });

  it('listens click events', () => {
    renderBookItem();

    fireEvent.click(screen.getByRole('button', { type: 'div' }));

    expect(handleClick).toBeCalled();
  });
});
