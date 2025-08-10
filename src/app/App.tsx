import './App.css';
import { useState } from 'react';
import Controls from '../components/Controls/Controls';
import Results from '../components/Results/Results';
import ErrorButton from '../components/ErrorButton/ErrorButton';
import type I_PokemonData from '../interfaces/I_PokemonData';
import sendRequest from '../services/sendRequest';
import { Routes, Route, Link } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import About from '../pages/About/About';
import { useQuery } from '@tanstack/react-query';
import spinner from '../assets/Loading_icon.gif';
import ClearCacheButton from '../components/ClearCacheButton/ClearCacheButton';

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
    <Routes>
      <Route
        path="/"
        element={
          <>
            <ClearCacheButton />
            <ErrorButton />
            <Link to="/about">About page</Link>
            <Controls onSearch={handleSearch} />
            {query.isLoading || (query.isFetching && !query.data) ? (
              <img src={spinner} alt="Loading..." />
            ) : query.isError ? (
              <p>
                Data loading error:{' '}
                {query.error instanceof Error
                  ? query.error.message
                  : 'Unknown error'}
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
        }
      ></Route>
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
