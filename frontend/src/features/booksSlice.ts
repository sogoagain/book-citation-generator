import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export type BooksState = Array<Book>;

const { actions, reducer } = createSlice({
  name: 'books',
  initialState: [] as BooksState,
  reducers: {
    setBooks: (
      _state: BooksState,
      { payload: books }: PayloadAction<Array<Book>>,
    ) => [...books],
  },
});

export const { setBooks } = actions;

export default reducer;
