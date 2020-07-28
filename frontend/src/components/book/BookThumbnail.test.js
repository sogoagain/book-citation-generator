import React from 'react';

import { render, screen } from '@testing-library/react';

import BookThumbnail from './BookThumbnail';

describe('BookThumbnail', () => {
  function renderBookThumbnail() {
    render(<BookThumbnail
      thumbnail="https://image.url"
      title="책 제목"
    />);
  }

  it('renders thumbnail', () => {
    renderBookThumbnail();

    expect(screen.getByAltText(/책 제목/)).toBeInTheDocument();
  });
});
