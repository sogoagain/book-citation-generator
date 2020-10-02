import * as React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { useTypedSelector, useTypedDispatch } from '../store';

import { BooksState } from '../features/booksSlice';

import SearchContainer from './SearchContainer';

import BOOKS from '../__fixtures__/books';

jest.mock('../store');

const mockUseSelector = useTypedSelector as jest.Mock;
const mockUseDispatch = useTypedDispatch as jest.Mock;

function renderSearchContainer() {
  render(<SearchContainer />);

  return {
    inputEl: screen.getByPlaceholderText(/어떤 책을 찾으세요/),
    buttonEl: screen.getByRole('button'),
  };
}

describe('SearchContainer', () => {
  const dispatch = jest.fn();
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
  mockUseDispatch.mockImplementation(() => dispatch);
  mockUseSelector.mockImplementation((selector) =>
    selector({
      books: booksState,
    }),
  );

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('change keyword', () => {
    const { inputEl, buttonEl } = renderSearchContainer();

    fireEvent.change(inputEl, { target: { value: '프로그래머' } });
    fireEvent.click(buttonEl);

    expect(dispatch).toBeCalled();
  });
});
