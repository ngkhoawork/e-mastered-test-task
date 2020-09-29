import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('should have homepage component', () => {
  const { getByTestId } = render(<App />);
  const homepageElement = getByTestId('homepage');
  expect(homepageElement).toBeInTheDocument();
});
