import { render } from '@testing-library/react';
import { test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Results from './Results';

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
    <MemoryRouter>
      <Results
        fetchedData={mockResponse}
        totalItems={1}
        onPageChange={mockFn}
      />
    </MemoryRouter>
  );
});
