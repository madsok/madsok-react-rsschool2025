import { create } from 'zustand';

interface SelectedCardsState {
  selectedCards: string[];
  toggleCard: (id: string) => void;
  resetSelectedCards: () => void;
}

export const useSelectedCardsStore = create<SelectedCardsState>((set, get) => ({
  selectedCards: [],
  toggleCard: (id: string) => {
    let selectedCards = [...get().selectedCards];
    const isSelectedCard = selectedCards.includes(id);

    if (isSelectedCard) {
      selectedCards = selectedCards.filter((cardId) => cardId !== id);
    } else {
      selectedCards.push(id);
    }

    set({ selectedCards: selectedCards });
    console.log('Selected Cards: ' + selectedCards);
  },
  resetSelectedCards: () => {
    set({ selectedCards: [] });
  },
}));
