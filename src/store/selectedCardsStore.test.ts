import { useSelectedCardsStore } from './selectedCardsStore';

test('selectedCardsStore test', () => {
  useSelectedCardsStore.getState().resetSelectedCards();

  expect(useSelectedCardsStore.getState().selectedCards).toEqual([]);

  useSelectedCardsStore.getState().toggleCard('1ditto');
  expect(useSelectedCardsStore.getState().selectedCards).toEqual(['1ditto']);

  useSelectedCardsStore.getState().toggleCard('2bulbasaur');
  expect(useSelectedCardsStore.getState().selectedCards).toEqual([
    '1ditto',
    '2bulbasaur',
  ]);

  useSelectedCardsStore.getState().toggleCard('1ditto');
  expect(useSelectedCardsStore.getState().selectedCards).toEqual([
    '2bulbasaur',
  ]);

  useSelectedCardsStore.getState().resetSelectedCards();
  expect(useSelectedCardsStore.getState().selectedCards).toEqual([]);
});
