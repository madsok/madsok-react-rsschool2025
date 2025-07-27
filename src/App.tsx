import './App.css';
import { useState } from 'react';
import Controls from './components/Controls';
import Results from './components/Results';
import ErrorButton from './components/ErrorButton';
import type I_PokemonData from './interfaces/I_PokemonData';

function App() {
  const [responseData, setResponseData] = useState<null | I_PokemonData>(null);

  return (
    <>
      <ErrorButton />
      <Controls onSearchResponse={setResponseData} />
      {responseData && <Results fetchedData={responseData} />}
    </>
  );
}

export default App;
