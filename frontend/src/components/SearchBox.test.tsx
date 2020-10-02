import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import SearchBox, { SearchBoxProps } from './SearchBox';

function renderSearchBox({ placeholder, onSearch }: SearchBoxProps) {
  render(<SearchBox placeholder={placeholder} onSearch={onSearch} />);

  return {
    inputEl: screen.getByPlaceholderText(placeholder),
    buttonEl: screen.getByRole('button'),
  };
}

describe('SearchBox', () => {
  const placeholder: string = '어떤 책을 찾으세요?';
  const handleSearch = jest.fn();

  beforeEach(() => {
    handleSearch.mockClear();
  });

  it('renders placeholder', () => {
    renderSearchBox({ placeholder, onSearch: handleSearch });

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('types keyword', () => {
    const { inputEl } = renderSearchBox({
      placeholder,
      onSearch: handleSearch,
    });

    fireEvent.change(inputEl, { target: { value: '프로그래머' } });

    expect(inputEl.value).toBe('프로그래머');
  });

  it('search keyword', () => {
    const { inputEl, buttonEl } = renderSearchBox({
      placeholder,
      onSearch: handleSearch,
    });

    fireEvent.change(inputEl, { target: { value: '프로그래머' } });
    fireEvent.click(buttonEl);

    expect(handleSearch).toBeCalledWith('프로그래머');
  });
});
