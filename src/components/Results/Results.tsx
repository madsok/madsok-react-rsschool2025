import Card from '../Card/Card';
import type I_PokemonData from '../../interfaces/I_PokemonData';
import Pagination from '../Pagination/Pagination';
import './Results.css';

interface ResultsProps {
  fetchedData: I_PokemonData;
  totalItems: number;
  onPageChange?: (page: number) => void;
}

function Results({ fetchedData, totalItems, onPageChange }: ResultsProps) {
  const { results } = fetchedData;
  return (
    <div className="results-block">
      <h2>Results</h2>
      <ul className="results">
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
      {totalItems && onPageChange && (
        <Pagination count={totalItems} onPageChange={onPageChange} />
      )}
    </div>
  );
}

export default Results;
