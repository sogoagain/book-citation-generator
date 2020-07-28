import React from 'react';

import { render, screen } from '@testing-library/react';

import Footer from './Footer';

describe('Footer', () => {
  it('renders developer information', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: /sogoagain/ })).toBeInTheDocument();
  });

  it('renders powered by', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: /kakao/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /bootstrap/ })).toBeInTheDocument();
  });
});
