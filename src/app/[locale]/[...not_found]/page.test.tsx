import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import NotFound from './page';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  NotFound: { text: 'Page not found' },
};

test('renders NotFound', () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <NotFound />
    </NextIntlClientProvider>
  );

  expect(screen.getByText('Page not found')).toBeDefined();
});
