import { useSelectedCardsStore } from '../../store/selectedCardsStore';
import { useTranslations } from 'next-intl';

function Flyout() {
  const selectedCardsTotal = useSelectedCardsStore(
    (state) => state.selectedCards.length
  );
  const resetSelectedCards = useSelectedCardsStore(
    (state) => state.resetSelectedCards
  );
  const t = useTranslations('Flyout');

  return (
    <>
      <div>
        <p>
          {selectedCardsTotal} {t('selected')}
        </p>
        <button onClick={() => resetSelectedCards()}>{t('unselect')}</button>
        <button>{t('download')}</button>
      </div>
    </>
  );
}

export default Flyout;
