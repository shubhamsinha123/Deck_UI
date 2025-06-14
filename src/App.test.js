/* eslint-disable linebreak-style */
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {expect, test} from '@jest/globals';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  waitFor(() => {
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  });
});
