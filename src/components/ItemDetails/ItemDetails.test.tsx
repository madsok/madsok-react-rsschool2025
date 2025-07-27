import { render } from '@testing-library/react';
import { test } from 'vitest';
import ItemDetails from './ItemDetails';

test('render Card', () => {
  const mockData = {
    name: 'ditto',
    url: 'https://pokeapi.co/api/v2/pokemon/132/encounters',
    sprites: {
      back_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png',
    },
  };

  render(<ItemDetails data={mockData} onItemDetailsClose={vi.fn()} />);
});
