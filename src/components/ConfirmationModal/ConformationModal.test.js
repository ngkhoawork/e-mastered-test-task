import React from 'react';
import { render } from '@testing-library/react';
import ConfirmationModal from '.';

test('renders modal container correctly', () => {
  const { getByTestId } = render(<ConfirmationModal show={true} />);
  const element = getByTestId('confirmation-modal')

  expect(element).toBeInTheDocument()
});

test('should show title and message correctly', () => {
  const { getByTestId } = render(<ConfirmationModal show title="Test Title" message="Test Message"/>);
  const element = getByTestId('confirmation-modal')
  expect(element).toHaveTextContent(/test title/i)
  expect(element).toHaveTextContent(/test message/i)
});

test('should have ok and cancel buttons', () => {
  const { getByTestId } = render(<ConfirmationModal show title="Test Title" message="Test Message"/>);
  const element = getByTestId('confirmation-modal')
  const cancelElement = getByTestId('cancel-button')
  const okElement = getByTestId('ok-button')

  expect(element).toContainElement(cancelElement)
  expect(element).toContainElement(okElement)
});