import * as React from 'react';

import { loadBooks } from '../features/booksSlice';

import { useTypedDispatch, useTypedSelector } from '../store';

import SearchBox from '../components/SearchBox';

export default function SearchContainer(): JSX.Element {
  const { pagination } = useTypedSelector(({ books }) => books);
  const dispatch = useTypedDispatch();

  const handleSearch = (keyword: string) => {
    dispatch(loadBooks(keyword, pagination));
  };

  return (
    <SearchBox placeholder="어떤 책을 찾으세요?" onSearch={handleSearch} />
  );
}
