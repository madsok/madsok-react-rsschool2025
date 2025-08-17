import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import Controls from './Controls';

vi.mock('next/navigation', async () => {
  const actual =
    await vi.importActual<typeof import('next/navigation')>('next/navigation');
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
  };
});

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      header: 'Controls header',
      placeholder: 'Enter term',
      search: 'Search Button',
    };
    return messages[key];
  },
}));

test('render Controls', () => {
  const mockFn = vi.fn();
  render(<Controls onSearch={mockFn} />);

  const input = screen.getByPlaceholderText('Enter term');
  expect(input).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /Search Button/i });
  expect(button).toBeInTheDocument();

  expect(screen.getByText('Controls header')).toBeInTheDocument();
});

test('updates input on change', () => {
  const mockFn = vi.fn();
  render(<Controls onSearch={mockFn} />);

  const input = screen.getByPlaceholderText('Enter term');
  fireEvent.change(input, { target: { value: 'ditto' } });

  expect(input).toHaveValue('ditto');
});
