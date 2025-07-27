import { useState, useEffect } from 'react';
import spinner from '../../assets/Loading_icon.gif';
import { useSearchParams } from 'react-router-dom';

interface ControlsProps {
  onSearch: (term: string, offset: number) => void;
}

function Controls({ onSearch }: ControlsProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchTerm = getTermFromLocalStorage('searchTerm');
    if (searchTerm) {
      setSearchValue(searchTerm);
      onSearch(searchTerm, 0);
    }
  }, []);

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
      setIsLoading(true);
      onSearch(searchValue, 0);
      saveTermToLocalStorage('searchTerm', searchValue);
      setIsLoading(false);
      setSearchValue('');
    }

    if (searchValue) {
      setSearchParams({ q: searchValue, page: '1' });
    } else {
      setSearchParams({ page: '1' });
    }
  }

  function saveTermToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  function getTermFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  return (
    <div className="controls">
      <h2>Top controls</h2>
      <div className="controls-wrapper">
        <input
          className="search-field"
          type="text"
          onChange={handleSearchInput}
          value={searchValue}
          placeholder="Enter term"
        />
        {isLoading ? (
          <img src={spinner} alt="" />
        ) : (
          <button className="search-button" onClick={handleSearchButton}>
            Search Button
          </button>
        )}
      </div>
    </div>
  );
}

export default Controls;
