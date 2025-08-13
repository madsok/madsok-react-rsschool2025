import type I_PokemonItem from '../../interfaces/I_PokemonItem';
import './Card.css';

interface CardProps {
  fetchedData: I_PokemonItem;
  onClick?: () => void;
}

function Card({ fetchedData, onClick }: CardProps) {
  return (
    <>
      <li className="pokemon-item" onClick={onClick}>
        <div>
          <h3>Item name</h3>
          <p>{fetchedData.name}</p>
        </div>
        <div>
          <h3>Item Description</h3>
          <p>{fetchedData.url}</p>
        </div>
      </li>
    </>
  );
}

export default Card;
