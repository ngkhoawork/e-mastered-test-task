import React from 'react';
import { render } from '@testing-library/react';
import FileList from '.';

test('renders correct columns', () => {
  const { getByTestId } = render(<FileList isLoading />);
  const element = getByTestId('file-list')
  expect(element).toHaveTextContent(/file id/i)
  expect(element).toHaveTextContent(/file name/i)
  expect(element).toHaveTextContent(/file size/i)
  expect(element).toHaveTextContent(/created/i)
  expect(element).toHaveTextContent(/action/i)
});

test('renders loading indicator when loading files', () => {
  const { getByTestId } = render(<FileList isLoading />);
  const element = getByTestId('file-list')
  expect(element).toHaveTextContent(/loading.../i)
});