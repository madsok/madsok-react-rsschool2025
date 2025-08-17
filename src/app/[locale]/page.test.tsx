import { render } from '@testing-library/react';
import { vi } from 'vitest';
import App from './page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('next/navigation', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
    redirect: vi.fn(),
    permanentRedirect: vi.fn(),
  };
});

const queryClient = new QueryClient();
const messages = { App: {} };

test('renders App', () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider locale="en" messages={messages}>
        <App />
      </NextIntlClientProvider>
    </QueryClientProvider>
  );

  expect(container).toBeInTheDocument();
});
