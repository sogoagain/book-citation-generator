import React from 'react';

import { Input } from 'antd';

const { Search } = Input;

export interface SearchBoxProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({
  placeholder,
  onSearch,
}: SearchBoxProps): JSX.Element {
  const handleSearch = (value: string) => {
    onSearch(value);
  };

  return (
    <Search placeholder={placeholder} onSearch={handleSearch} enterButton />
  );
}
