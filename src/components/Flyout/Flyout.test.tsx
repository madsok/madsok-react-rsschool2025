import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import Flyout from './Flyout';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Flyout: {
    selected: 'Selected',
    unselect: 'Unselect',
    download: 'Download',
  },
};

test('render Flyout', () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Flyout />
    </NextIntlClientProvider>
  );

  expect(screen.getByText(/Selected/i)).toBeInTheDocument();
  expect(screen.getByText(/Unselect/i)).toBeInTheDocument();
  expect(screen.getByText(/Download/i)).toBeInTheDocument();
});
