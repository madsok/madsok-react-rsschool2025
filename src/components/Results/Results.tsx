import Card from '../Card/Card';
import type I_PokemonData from '../../interfaces/I_PokemonData';
import Pagination from '../Pagination/Pagination';
import './Results.css';
import { useState } from 'react';
import ItemDetails from '../ItemDetails/ItemDetails';
import type I_PokemonItem from '../../interfaces/I_PokemonItem';
import sendRequest from '../../services/sendRequest';
import spinner from '../../assets/Loading_icon.gif';
import { useSearchParams } from 'react-router-dom';
import { useSelectedCardsStore } from '../../store/selectedCardsStore';
import Flyout from '../Flyout/Flyout';

interface ResultsProps {
  fetchedData: I_PokemonData;
  totalItems: number;
  onPageChange?: (page: number) => void;
  currentPage: number;
}

function Results({
  fetchedData,
  totalItems,
  onPageChange,
  currentPage,
}: ResultsProps) {
  const { results } = fetchedData;
  const [showDetails, setShowDetails] = useState(false);
  const [detailsData, setDetailsData] = useState<null | I_PokemonItem>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();
  const selectedCardsTotal = useSelectedCardsStore(
    (state) => state.selectedCards.length
  );

  async function cardHandler(name: string) {
    setIsLoading(true);
    const data = await sendRequest<I_PokemonItem>(name);
    if (data) {
      setDetailsData(data);
      setShowDetails(true);
      setSearchParams({ q: data.name });
    }
    setIsLoading(false);
  }
  return (
    <div className="results-block">
      <h2>Results</h2>
      <div className="results-wrapper">
        <ul className="results">
          {results ? (
            results.map((item, index) => (
              <Card
                key={index + item.name}
                fetchedData={item}
                onClick={() => cardHandler(item.name)}
                id={index + item.name}
              />
            ))
          ) : (
            <li
              className="pokemon-item"
              onClick={() => cardHandler(fetchedData.name)}
            >
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
        {isLoading ? (
          <img className="spinner" src={spinner} alt="" />
        ) : (
          showDetails &&
          detailsData && (
            <ItemDetails
              data={detailsData}
              onItemDetailsClose={setShowDetails}
            />
          )
        )}
      </div>
      {totalItems && onPageChange && (
        <Pagination
          count={totalItems}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
      )}
      {selectedCardsTotal > 0 && <Flyout />}
    </div>
  );
}

export default Results;
