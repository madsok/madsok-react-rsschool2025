import './Pagination.css';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  count: number;
  onPageChange: (page: number) => void;
}

function Pagination({ count, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(count / 20);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [inputNumber, setInputNumber] = useState<string>('1');
  const [, setSearchParams] = useSearchParams();

  function prevButtonHandler() {
    if (pageNumber === 1) return false;
    setPageNumber(pageNumber - 1);
    setInputNumber(String(pageNumber - 1));
    onPageChange(pageNumber - 1);
    setSearchParams({ page: `${pageNumber - 1}` });
  }

  function nextButtonHandler() {
    if (pageNumber === totalPages - 1) return false;
    setPageNumber(pageNumber + 1);
    setInputNumber(String(pageNumber + 1));
    onPageChange(pageNumber + 1);
    setSearchParams({ page: `${pageNumber + 1}` });
  }
  function goToButtonHandler() {
    const pageNumber = parseInt(inputNumber, 10);

    if (pageNumber < 1 || pageNumber > totalPages) return false;
    setPageNumber(pageNumber);
    setInputNumber(String(pageNumber));
    onPageChange(pageNumber);
    setSearchParams({ page: `${pageNumber}` });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputNumber(e.target.value);
  }

  return (
    <ul className="pagination">
      <li className="pagination-item">
        <button className="prev" onClick={prevButtonHandler}>
          Previous
        </button>
      </li>
      <li>
        <button onClick={goToButtonHandler}>Go to: </button>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={inputNumber}
          onChange={handleInputChange}
        />
      </li>
      <li>
        <button className="next" onClick={nextButtonHandler}>
          Next
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
