import './App.css';
import { useState } from 'react';
import Controls from './components/Controls';
import Results from './components/Results/Results';
import ErrorButton from './components/ErrorButton';
import type I_PokemonData from './interfaces/I_PokemonData';
import sendRequest from './services/sendRequest';
import { Routes, Route, Link } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import About from './pages/About/About';

function App() {
  const [responseData, setResponseData] = useState<null | I_PokemonData>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  async function getData(searchReq: string, offset: number) {
    const data = await sendRequest<I_PokemonData>(searchReq, offset);
    if (data) {
      setResponseData(data);
      setSearchValue(searchReq);
    }
  }

  function handlePageChange(pageNumber: number) {
    const offset = (pageNumber - 1) * 5;
    getData(searchValue, offset);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <ErrorButton />
            <Link to="/about">About page</Link>
            <Controls onSearch={getData} />
            {responseData && (
              <Results
                fetchedData={responseData}
                totalItems={responseData.count}
                onPageChange={handlePageChange}
              />
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
