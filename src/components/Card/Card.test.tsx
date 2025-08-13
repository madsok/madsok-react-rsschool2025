import { render } from '@testing-library/react';
import { test } from 'vitest';
import Card from '../Card/Card';

test('render Card', () => {
  const mockData = {
    name: 'ditto',
    url: 'https://pokeapi.co/api/v2/pokemon/132/encounters',
    sprites: {
      back_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png',
    },
  };

  render(<Card fetchedData={mockData} onClick={vi.fn()} />);
});
