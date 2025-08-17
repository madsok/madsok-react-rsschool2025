import { render, screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import ItemDetails from './ItemDetails';
import { NextIntlClientProvider } from 'next-intl';

const messages = { ItemDetails: { value: 'test value' } };

test('render ItemDetails', () => {
  const mockData = {
    name: 'ditto',
    url: 'https://pokeapi.co/api/v2/pokemon/132/encounters',
    sprites: {
      back_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png',
    },
  };

  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <ItemDetails data={mockData} onItemDetailsClose={vi.fn()} />
    </NextIntlClientProvider>
  );

  expect(screen.getByText('ditto')).toBeInTheDocument();
});
