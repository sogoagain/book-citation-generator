import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

function renderApp() {
  render(<App />);

  return {
    getLinkByName: (name) => screen.getByRole('link', { name }),
    getButtonByName: (name) => screen.getByRole('button', { name }),
    getSearchInput: () => screen.getByPlaceholderText(/어떤 책을 찾으세요?/),
  };
}

describe('<App />', () => {
  it('renders header', () => {
    const { getLinkByName } = renderApp(<App />);

    expect(getLinkByName(/도서 출처 표기 생성기/)).toBeInTheDocument();
  });

  it('renders search form', () => {
    const { getButtonByName, getSearchInput } = renderApp(<App />);

    expect(getSearchInput()).toBeInTheDocument();
    expect(getButtonByName(/검색/)).toBeInTheDocument();
  });

  it('renders footer', () => {
    const { getLinkByName } = renderApp(<App />);

    expect(getLinkByName(/sogoagain/)).toBeInTheDocument();
  });
});
