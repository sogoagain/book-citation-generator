import React from 'react';

import { render, screen } from '@testing-library/react';

import BookThumbnail from './BookThumbnail';

import BOOK from '../../__fixtures__/book';

describe('BookThumbnail', () => {
  function renderBookThumbnail() {
    render(<BookThumbnail
      thumbnail={BOOK.thumbnail}
      title={BOOK.title}
    />);
  }

  it('renders thumbnail', () => {
    renderBookThumbnail();

    expect(screen.getByAltText(/실용주의 프로그래머/)).toBeInTheDocument();
  });
});
