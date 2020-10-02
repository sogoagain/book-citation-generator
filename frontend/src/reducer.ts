import { combineReducers } from '@reduxjs/toolkit';

import books from './features/booksSlice';

const reducer = combineReducers({
  books,
});

export type RootState = ReturnType<typeof reducer>;
export default reducer;
