import { getDefaultMiddleware } from '@reduxjs/toolkit';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { fetchBooks } from '../services/api';

import { BooksState, setItems, loadBooks } from './booksSlice';

import { RootState } from '../reducer';
import { ThunkDispatchType } from '../store';

import BOOKS from '../__fixtures__/books';
import META from '../__fixtures__/meta';

jest.mock('../services/api');

const mockFetchBooks = fetchBooks as jest.Mock;

const mockStore = configureStore<RootState, ThunkDispatchType>(
  getDefaultMiddleware(),
);

describe('books actions', () => {
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
  let store: MockStoreEnhanced<RootState, ThunkDispatchType>;

  beforeEach(() => {
    store = mockStore({ books: initialState });
  });

  describe('loadBooks', () => {
    context('when idea is fetched', () => {
      beforeEach(() => {
        mockFetchBooks.mockClear();
        mockFetchBooks.mockResolvedValue({
          documents: BOOKS,
          meta: META,
        });
      });

      it('loads books', async () => {
        await store.dispatch(loadBooks('프로그래머', { page: 1, size: 5 }));

        const actions = store.getActions();

        expect(fetchBooks).toBeCalled();
        expect(actions[2]).toEqual(setItems(BOOKS));
      });
    });
  });
});
