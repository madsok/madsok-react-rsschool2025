import { render } from '@testing-library/react';
import { test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Results from './Results';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

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
      <MemoryRouter>
        <Results
          fetchedData={mockResponse}
          totalItems={1}
          onPageChange={mockFn}
          currentPage={1}
        />
      </MemoryRouter>
    </QueryClientProvider>
  );
});
