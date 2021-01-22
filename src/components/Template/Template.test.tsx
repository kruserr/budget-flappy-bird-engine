import React from 'react';
import { render, screen } from '@testing-library/react';

import Template from './Template';


test('renders Template', () => {
  render(<Template />);
  const linkElement = screen.getByText(/Template/);
  expect(linkElement).toBeInTheDocument();
});
