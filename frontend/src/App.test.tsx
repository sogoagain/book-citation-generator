import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useTypedSelector, useTypedDispatch } from './store';

import App from './App';

import BOOKS from './__fixtures__/books';

jest.mock('./store');

const mockUseSelector = useTypedSelector as jest.Mock;
const mockUseDispatch = useTypedDispatch as jest.Mock;

describe('App', () => {
  const dispatch = jest.fn();
  mockUseDispatch.mockImplementation(() => dispatch);
  mockUseSelector.mockImplementation((selector) =>
    selector({
      books: BOOKS,
    }),
  );

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('renders title', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/도서 출처 표기법/)).toBeInTheDocument();
  });
});
