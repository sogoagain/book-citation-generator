import React from 'react';

import { render, screen } from '@testing-library/react';

import { useSelector } from 'react-redux';

import BookDetailContainer from './BookDetailContainer';

import BOOK from '../__fixtures__/book';

global.document.queryCommandSupported = jest.fn().mockReturnValue(true);
jest.mock('react-redux');

describe('BookDetailContainer', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      book: BOOK,
    }));
  });

  it('renders description', () => {
    render(<BookDetailContainer />);

    expect(screen.getByText(/실용주의 프로그래머/)).toBeInTheDocument();
  });

  it('renders copy button', () => {
    render(<BookDetailContainer />);

    expect(screen.getByText(/복사/)).toBeInTheDocument();
  });
});
