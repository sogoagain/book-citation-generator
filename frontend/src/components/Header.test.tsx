import React from 'react';

import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it('renders header text', () => {
    render(<Header />);

    expect(screen.getByText(/도서 출처 표기법/)).toBeInTheDocument();
  });
});
