import React from 'react';

import { render, screen } from '@testing-library/react';

import BookYear from './BookYear';

import BOOK from '../../__fixtures__/book';

describe('BookYear', () => {
  function renderBookYear() {
    render(<BookYear
      datetime={BOOK.datetime}
    />);
  }

  it('renders year', () => {
    renderBookYear();

    expect(screen.getByText(/2014/)).toBeInTheDocument();
  });
});
