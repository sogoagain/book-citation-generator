import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pagination } from 'antd';
import { batch } from 'react-redux';

import { BooksResponse, fetchBooks } from '../services/api';
import { ThunkType } from '../store';

export type Book = {
  authors: Array<string>;
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: Array<string>;
  url: string;
};

export type Pagination = {
  page: number;
  size: number;
  total?: number;
};

export type BooksState = {
  items: Array<Book>;
  keyword: string;
  pagination: Pagination;
  loading: boolean;
};

const { actions, reducer } = createSlice({
  name: 'books',
  initialState: {
    items: [],
    keyword: '',
    pagination: {
      page: 1,
      size: 5,
      total: 0,
    },
    loading: false,
  } as BooksState,
  reducers: {
    setItems: (
      state: BooksState,
      { payload: items }: PayloadAction<Array<Book>>,
    ) => ({
      ...state,
      items: [...items],
    }),

    setKeyword: (
      state: BooksState,
      { payload: keyword }: PayloadAction<string>,
    ) => ({
      ...state,
      keyword,
    }),

    setPagination: (
      state: BooksState,
      { payload: pagination }: PayloadAction<Pagination>,
    ) => ({
      ...state,
      pagination: {
        ...pagination,
      },
    }),

    setLoading: (
      state: BooksState,
      { payload: loading }: PayloadAction<boolean>,
    ) => ({
      ...state,
      loading,
    }),
  },
});

export const { setItems, setKeyword, setPagination, setLoading } = actions;

export function loadBooks(
  keyword: string,
  { page, size }: Pagination,
): ThunkType {
  return async (dispatch) => {
    batch(() => {
      dispatch(setLoading(true));
      dispatch(setKeyword(keyword));
    });

    const response: BooksResponse = await fetchBooks({ keyword, page, size });

    const pagination: Pagination = {
      page,
      size,
      total: response.meta.total_count,
    };

    batch(() => {
      dispatch(setItems(response.documents));
      dispatch(setPagination(pagination));
      dispatch(setLoading(false));
    });
  };
}

export default reducer;
