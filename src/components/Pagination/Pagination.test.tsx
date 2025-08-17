import { render, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Pagination from './Pagination';
import { vi } from 'vitest';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock, replace: vi.fn() }),
  usePathname: () => '/test',
}));

const messages = {
  Pagination: {
    prev: 'Previous',
    next: 'Next',
    goTo: 'Go to:',
  },
};

test('Pagination button test', () => {
  const onPageChange = vi.fn();

  const { getByText, getByRole, rerender } = render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Pagination count={132} currentPage={1} onPageChange={onPageChange} />
    </NextIntlClientProvider>
  );

  const nextButton = getByText('Next');
  const prevButton = getByText('Previous');
  const goButton = getByText('Go to:');
  const input = getByRole('spinbutton') as HTMLInputElement;

  expect(input.value).toBe('1');

  fireEvent.click(nextButton);
  expect(onPageChange).toHaveBeenCalledWith(2);
  expect(pushMock).toHaveBeenCalledWith('/test?page=2');

  rerender(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Pagination count={132} currentPage={2} onPageChange={onPageChange} />
    </NextIntlClientProvider>
  );

  fireEvent.click(prevButton);
  expect(onPageChange).toHaveBeenCalledWith(1);
  expect(pushMock).toHaveBeenCalledWith('/test?page=1');

  fireEvent.change(input, { target: { value: '5' } });
  fireEvent.click(goButton);
  expect(onPageChange).toHaveBeenCalledWith(5);
  expect(pushMock).toHaveBeenCalledWith('/test?page=5');
});
