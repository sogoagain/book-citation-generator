import booksReducer, { BooksState, setBooks } from './booksSlice';

import BOOKS from '../__fixtures__/books';

describe('books reducer', () => {
  describe('setBooks', () => {
    it('changes books', () => {
      const previousState: BooksState = [];

      const state = booksReducer(previousState, setBooks(BOOKS));

      expect(state).toEqual(BOOKS);
    });
  });
});
