import React from 'react';

import { render, screen } from '@testing-library/react';

import Header from './Header';

test('Header', () => {
  render((
    <Header />
  ));

  expect(screen.getByText(/도서 출처 표기 생성기/)).toBeInTheDocument();
});
