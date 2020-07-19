import React from 'react';

import { render, screen } from '@testing-library/react';

import BookPublisher from './BookPublisher';

describe('BookPublisher', () => {
  it('renders publisher', () => {
    render(<BookPublisher publisher="인사이트" />);

    expect(screen.getByText(/출판/)).toBeInTheDocument();
    expect(screen.getByText(/인사이트/)).toBeInTheDocument();
  });
});
