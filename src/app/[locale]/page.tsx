'use client';

import './App.css';
import { useState } from 'react';
import Controls from '../../components/Controls/Controls';
import Results from '../../components/Results/Results';
import type I_PokemonData from '../../interfaces/I_PokemonData';
import sendRequest from '../../services/sendRequest';
import { useQuery } from '@tanstack/react-query';
import spinner from '../../assets/Loading_icon.gif';
import ClearCacheButton from '../../components/ClearCacheButton/ClearCacheButton';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LangSwitcher from '../../components/LangSwitcher/LangSwitcher';

function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 5;
  const t = useTranslations('App');

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
      <LangSwitcher />
      <ClearCacheButton />
      <Link href="/about">{t('about')}</Link>
      <Controls onSearch={handleSearch} />
      {query.isLoading || (query.isFetching && !query.data) ? (
        <Image src={spinner} alt={t('loading')} width={300} height={300} />
      ) : query.isError ? (
        <p>
          {t('dataError')}{' '}
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
