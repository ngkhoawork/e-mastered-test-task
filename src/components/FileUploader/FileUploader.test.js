import React from 'react';
import { render } from '@testing-library/react';
import FileUploader from '.';

test('renders correct description', () => {
  const { getByText } = render(<FileUploader />);
  const descriptionElement = getByText(/drag 'n' drop some files here/i);
  expect(descriptionElement).toBeInTheDocument();
});

test('should have file input element', () => {
  const { getByTestId } = render(<FileUploader />);
  const fileInputElement = getByTestId('file-input');
  expect(fileInputElement).toBeInTheDocument();
})

test('should accept only audio files', () => {
  const { getByTestId } = render(<FileUploader />);
  const fileInputElement = getByTestId('file-input');
  expect(fileInputElement).toHaveAttribute('accept', expect.stringMatching('audio/*'))
})