'use client';

import './App.css';
import { useState } from 'react';
import Controls from '../components/Controls/Controls';
import Results from '../components/Results/Results';
import ErrorButton from '../components/ErrorButton/ErrorButton';
import type I_PokemonData from '../interfaces/I_PokemonData';
import sendRequest from '../services/sendRequest';
import { useQuery } from '@tanstack/react-query';
import spinner from '../assets/Loading_icon.gif';
import ClearCacheButton from '../components/ClearCacheButton/ClearCacheButton';
import Link from 'next/link';
import Image from 'next/image';

function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 5;

  const query = useQuery({
    queryKey: ['dataRequest', searchValue, offset],
    queryFn: () => sendRequest<I_PokemonData>(searchValue, offset),
  });

  function handlePageChange(pageNumber: number) {
    setPage(pageNumber);
  }

  function handleSearch(value: string) {
    setSearchValue(value);
    setPage(1);
  }

  return (
    <>
      <ClearCacheButton />
      <ErrorButton />
      <Link href="/about">About page</Link>
      <Controls onSearch={handleSearch} />
      {query.isLoading || (query.isFetching && !query.data) ? (
        <Image src={spinner} alt="Loading..." width={300} height={300} />
      ) : query.isError ? (
        <p>
          Data loading error:{' '}
          {query.error instanceof Error ? query.error.message : 'Unknown error'}
        </p>
      ) : (
        query.data && (
          <Results
            fetchedData={query.data}
            totalItems={query.data.count}
            onPageChange={handlePageChange}
            currentPage={page}
          />
        )
      )}
    </>
  );
}

export default App;
