import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import About from './page';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  About: {
    name: 'Konstantin Tarasov',
    course: 'RS School React course',
  },
};

test('render About', () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <About />
    </NextIntlClientProvider>
  );

  expect(screen.getByText('Konstantin Tarasov')).toBeInTheDocument();
  expect(screen.getByText('RS School React course')).toBeInTheDocument();
});
