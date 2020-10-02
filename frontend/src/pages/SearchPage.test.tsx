import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { useTypedSelector, useTypedDispatch } from '../store';

import { BooksState } from '../features/booksSlice';

import SearchPage from './SearchPage';

import BOOKS from '../__fixtures__/books';

jest.mock('../store');

const mockUseSelector = useTypedSelector as jest.Mock;
const mockUseDispatch = useTypedDispatch as jest.Mock;

describe('SearchPage', () => {
  const booksState: BooksState = {
    items: BOOKS,
    keyword: '',
    pagination: {
      page: 1,
      size: 5,
      total: 100,
    },
    loading: false,
  };
  mockUseDispatch.mockImplementation(() => jest.fn());
  mockUseSelector.mockImplementation((selector) =>
    selector({
      books: booksState,
    }),
  );

  it('renders search box', () => {
    render(<SearchPage />);

    expect(
      screen.getByPlaceholderText(/어떤 책을 찾으세요?/),
    ).toBeInTheDocument();
  });
});
