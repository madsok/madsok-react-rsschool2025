import type I_PokemonItem from '../../interfaces/I_PokemonItem';
import './Card.css';
import { useSelectedCardsStore } from '../../store/selectedCardsStore';
import { useTranslations } from 'next-intl';

interface CardProps {
  fetchedData: I_PokemonItem;
  onClick?: () => void;
  id: string;
}

function Card({ fetchedData, onClick, id }: CardProps) {
  const selectedCards = useSelectedCardsStore((state) => state.selectedCards);
  const toggleCard = useSelectedCardsStore((state) => state.toggleCard);
  const isChecked = selectedCards.includes(id);
  const t = useTranslations('Card');
  return (
    <>
      <li className="pokemon-item" onClick={onClick} id={id}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => toggleCard(id)}
        />
        <div>
          <h3>{t('itemName')}</h3>
          <p>{fetchedData.name}</p>
        </div>
        <div>
          <h3>{t('itemDescription')}</h3>
          <p>{fetchedData.url}</p>
        </div>
      </li>
    </>
  );
}

export default Card;
