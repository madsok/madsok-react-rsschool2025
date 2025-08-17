import Card from '../Card/Card';
import type I_PokemonData from '../../interfaces/I_PokemonData';
import Pagination from '../Pagination/Pagination';
import './Results.css';
import { useState } from 'react';
import ItemDetails from '../ItemDetails/ItemDetails';
import type I_PokemonItem from '../../interfaces/I_PokemonItem';
import sendRequest from '../../services/sendRequest';
import spinner from '../../assets/Loading_icon.gif';
import { useRouter, usePathname } from 'next/navigation';
import { useSelectedCardsStore } from '../../store/selectedCardsStore';
import Flyout from '../Flyout/Flyout';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

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
  const router = useRouter();
  const pathname = usePathname();
  const tr = useTranslations('Results');
  const t = useTranslations('App');
  const selectedCardsTotal = useSelectedCardsStore(
    (state) => state.selectedCards.length
  );
  const [pokemonName, setPokemonName] = useState<string | null>(null);
  const query = useQuery({
    queryKey: ['dataRequest', pokemonName],
    queryFn: () => {
      if (pokemonName) {
        return sendRequest<I_PokemonItem>(pokemonName);
      }
    },
    enabled: !!pokemonName,
  });

  function cardHandler(name: string) {
    setPokemonName(name);
    setShowDetails(true);
    router.push(`${pathname}?${new URLSearchParams({ q: name }).toString()}`);
  }
  return (
    <div className="results-block">
      <h2>{tr('results')}</h2>
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
                <h3>{tr('itemName')}</h3>
                <p>{fetchedData.name ?? ''}</p>
              </div>
              <div>
                <h3>{tr('itemDescription')}</h3>
                <p>{fetchedData.location_area_encounters ?? ''}</p>
              </div>
            </li>
          )}
        </ul>
        {query.isLoading || (query.isFetching && !query.data) ? (
          <Image src={spinner} alt={t('loading')} width={300} height={300} />
        ) : query.isError ? (
          <p>
            {t('dataError')}{' '}
            {query.error instanceof Error
              ? query.error.message
              : 'Unknown error'}
          </p>
        ) : (
          showDetails &&
          query.data && (
            <ItemDetails
              data={query.data}
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
