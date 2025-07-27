import type I_PokemonItem from '../interfaces/I_PokemonItem';

interface CardProps {
  fetchedData: I_PokemonItem;
}

function Card({ fetchedData }: CardProps) {
  return (
    <>
      <li className="pokemon-item">
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
