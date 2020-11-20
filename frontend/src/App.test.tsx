import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useTypedSelector, useTypedDispatch } from './store';

import App from './App';

import books from './__fixtures__/books';

jest.mock('./store');

const mockUseSelector = useTypedSelector as jest.Mock;
const mockUseDispatch = useTypedDispatch as jest.Mock;

function renderApp(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('App', () => {
  const dispatch = jest.fn();
  mockUseDispatch.mockImplementation(() => dispatch);
  mockUseSelector.mockImplementation((selector) =>
    selector({
      books: books,
      keyword: '',
    }),
  );

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('renders title', () => {
    renderApp('/');

    expect(screen.getByText(/도서 출처 표기 생성기/)).toBeInTheDocument();
  });

  it('renders links', () => {
    renderApp('/');

    expect(
      screen.getByRole('link', { name: /도서 출처 표기 생성기/ }),
    ).toBeInTheDocument();
  });

  context('with path /', () => {
    it('renders search box', () => {
      renderApp('/');

      expect(
        screen.getByPlaceholderText(/어떤 책을 찾으세요?/),
      ).toBeInTheDocument();
    });
  });
});
