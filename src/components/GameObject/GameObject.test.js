import React from 'react';
import { render, screen } from '@testing-library/react';

import GameObject from './GameObject';


test('renders GameObject', () => {
  render(<GameObject />);
});
