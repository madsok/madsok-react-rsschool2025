import { useState, useEffect } from 'react';
import spinner from './../assets/Loading_icon.gif';
import type I_PokemonData from '../interfaces/I_PokemonData';

interface ControlsProps {
  onSearchResponse: (data: null | I_PokemonData) => void;
}

function Controls({ onSearchResponse }: ControlsProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const searchTerm = getTermFromLocalStorage('searchTerm');

    if (searchTerm || searchTerm === '') {
      getData(searchTerm);
    }
  }, []);

  async function getData(request: string): Promise<object | null> {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${request}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        onSearchResponse(data);
        setIsLoading(false);
        return data;
      } else {
        console.log(response.status);
        setIsLoading(false);
        return null;
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return null;
    }
  }

  function handleSearchInput(event: React.ChangeEvent) {
    const target = event.target;

    if (target && target instanceof HTMLInputElement) {
      if (target.value) {
        setSearchValue(target.value.trim());
      } else {
        setSearchValue('');
      }
    }
  }

  function handleSearchButton() {
    if (searchValue || searchValue == '') {
      getData(searchValue);
      saveTermToLocalStorage('searchTerm', searchValue);
    }
  }

  function saveTermToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  function getTermFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  return (
    <>
      <h2>Top controls</h2>
      <div className="controls-wrapper">
        <input
          className="search-field"
          type="text"
          onChange={handleSearchInput}
        />
        {isLoading ? (
          <img src={spinner} alt="" />
        ) : (
          <button className="search-button" onClick={handleSearchButton}>
            Search Button
          </button>
        )}
      </div>
    </>
  );
}

export default Controls;
