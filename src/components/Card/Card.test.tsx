import { render, screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import Card from '../Card/Card';
import { NextIntlClientProvider } from 'next-intl';

const messages = { Card: { name: 'Item name' } };

test('render Card', () => {
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
      <Card fetchedData={mockData} onClick={vi.fn()} id="id" />
    </NextIntlClientProvider>
  );

  expect(screen.getByText('ditto')).toBeInTheDocument();
});
