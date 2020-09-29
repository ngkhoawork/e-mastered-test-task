import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './HomePage';

test('renders correct title', () => {
  const { getByText } = render(<HomePage />);
  const linkElement = getByText(/e-mastered online audio manager/i);
  expect(linkElement).toBeInTheDocument();
});

test('should have file uploader component', () => {
  const { getByTestId } = render(<HomePage />);
  const fileUploaderElement = getByTestId('file-uploader');
  expect(fileUploaderElement).toBeInTheDocument();
})

test('should have file uploader component', () => {
  const { getByTestId } = render(<HomePage />);
  const fileTableElement = getByTestId('file-list');
  expect(fileTableElement).toBeInTheDocument();
})