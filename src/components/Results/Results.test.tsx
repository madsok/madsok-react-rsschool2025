import { render } from '@testing-library/react';
import { test, vi } from 'vitest';
import Results from './Results';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';

const queryClient = new QueryClient();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/test',
}));

const messages = {
  Results: { value: 'test value' },
  App: { value: 'test value' },
};

test('render Results', () => {
  const mockFn = vi.fn();

  const mockResponse = {
    name: 'ditto',
    results: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
        sprites: {
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png',
        },
      },
    ],
    location_area_encounters:
      'https://pokeapi.co/api/v2/pokemon/132/encounters',
    count: 24,
  };

  render(
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider locale="en" messages={messages}>
        <Results
          fetchedData={mockResponse}
          totalItems={1}
          onPageChange={mockFn}
          currentPage={1}
        />
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
});
