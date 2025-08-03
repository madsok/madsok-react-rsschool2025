import { useSelectedCardsStore } from '../../store/selectedCardsStore';

function Flyout() {
  const selectedCardsTotal = useSelectedCardsStore(
    (state) => state.selectedCards.length
  );
  const resetSelectedCards = useSelectedCardsStore(
    (state) => state.resetSelectedCards
  );

  return (
    <>
      <div>
        <p>{selectedCardsTotal} items are selected</p>
        <button onClick={() => resetSelectedCards()}>Unselect all</button>
        <button>Download</button>
      </div>
    </>
  );
}

export default Flyout;
