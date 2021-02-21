import React from 'react';
import { render, screen } from '@testing-library/react';

import Template from './Template';


test('renders Template', () => {
  render(<Template />);
  expect(screen.getByText(/Template/)).toBeInTheDocument();
});
