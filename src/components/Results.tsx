import Card from './Card';
import type I_PokemonData from '../interfaces/I_PokemonData';

interface ResultsProps {
  fetchedData: I_PokemonData;
}

function Results({ fetchedData }: ResultsProps) {
  const { results } = fetchedData;
  return (
    <>
      <h2>Results</h2>
      <ul>
        {results ? (
          results.map((item, index) => <Card key={index} fetchedData={item} />)
        ) : (
          <li className="pokemon-item">
            <div>
              <h3>Item name</h3>
              <p>{fetchedData.name ?? ''}</p>
            </div>
            <div>
              <h3>Item Description</h3>
              <p>{fetchedData.location_area_encounters ?? ''}</p>
            </div>
          </li>
        )}
      </ul>
    </>
  );
}

export default Results;
