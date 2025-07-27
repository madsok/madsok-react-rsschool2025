import sendRequest from './sendRequest';
import { test, vi, type Mock } from 'vitest';

beforeEach(() => {
  (global.fetch as Mock) = vi.fn();
});

afterEach(() => {
  vi.resetAllMocks();
});

test('test sendRequest', async () => {
  const mockResponse = {
    name: 'ditto',
    location_area_encounters:
      'https://pokeapi.co/api/v2/pokemon/132/encounters',
  };

  (global.fetch as Mock).mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });

  const result = await sendRequest('ditto', 5);

  expect(result).toEqual(mockResponse);
  expect(fetch).toHaveBeenCalledWith(
    'https://pokeapi.co/api/v2/pokemon/ditto/?limit=5&offset=5'
  );
});
