import './Pagination.css';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  count: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

function Pagination({ count, onPageChange, currentPage }: PaginationProps) {
  const totalPages = Math.ceil(count / 20);
  const [inputNumber, setInputNumber] = useState<string>('1');
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Pagination');

  useEffect(() => {
    setInputNumber(String(currentPage));
  }, [currentPage]);

  function prevButtonHandler() {
    if (currentPage === 1) return false;
    setInputNumber(String(currentPage - 1));
    onPageChange(currentPage - 1);
    router.push(
      `${pathname}?${new URLSearchParams({ page: String(currentPage - 1) }).toString()}`
    );
  }

  function nextButtonHandler() {
    if (currentPage >= totalPages) return false;
    setInputNumber(String(currentPage + 1));
    onPageChange(currentPage + 1);
    router.push(
      `${pathname}?${new URLSearchParams({ page: String(currentPage + 1) }).toString()}`
    );
  }
  function goToButtonHandler() {
    const pageNumber = parseInt(inputNumber, 10);

    if (pageNumber < 1 || pageNumber > totalPages) return false;
    setInputNumber(String(pageNumber));
    onPageChange(pageNumber);
    router.push(
      `${pathname}?${new URLSearchParams({ page: String(pageNumber) }).toString()}`
    );
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputNumber(e.target.value);
  }

  return (
    <ul className="pagination">
      <li className="pagination-item">
        <button className="prev" onClick={prevButtonHandler}>
          {t('prev')}
        </button>
      </li>
      <li>
        <button onClick={goToButtonHandler}>{t('goTo')}</button>
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
          {t('prev')}
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
