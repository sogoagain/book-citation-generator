import booksReducer, {
  BooksState,
  Pagination,
  setItems,
  setKeyword,
  setPagination,
  setLoading,
} from './booksSlice';

import BOOKS from '../__fixtures__/books';

describe('books reducer', () => {
  const initialState: BooksState = {
    items: [],
    keyword: '',
    pagination: {
      page: 1,
      size: 5,
      total: 0,
    },
    loading: false,
  };

  describe('setItems', () => {
    it('changes books', () => {
      const previousState = initialState;

      const state = booksReducer(previousState, setItems(BOOKS));

      expect(state.items).toEqual(BOOKS);
    });
  });

  describe('setKeyword', () => {
    it('changes keyword', () => {
      const previousState = initialState;

      const state = booksReducer(previousState, setKeyword('프로그래머'));

      expect(state.keyword).toEqual('프로그래머');
    });
  });

  describe('setPagination', () => {
    it('changes pagination', () => {
      const previousState = initialState;
      const pagination: Pagination = {
        page: 10,
        size: 7,
        total: 100,
      };

      const state = booksReducer(previousState, setPagination(pagination));

      expect(state.pagination).toStrictEqual(pagination);
    });
  });

  describe('setLoading', () => {
    it('changes loading', () => {
      const previousState = initialState;

      const state = booksReducer(previousState, setLoading(true));

      expect(state.loading).toBe(true);
    });
  });
});
