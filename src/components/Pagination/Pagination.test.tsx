import { render, fireEvent } from '@testing-library/react';
import { test } from 'vitest';
import Pagination from './Pagination';
import { MemoryRouter } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState(1);

  return <Pagination count={132} currentPage={page} onPageChange={setPage} />;
}

test('render Pagination', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const prevButton = getByText(/Previous/);
  const nextButton = getByText(/Next/);
  const goToButton = getByText(/Go to:/);
  const inputPage = getByRole('spinbutton');

  expect(inputPage).toHaveValue(1);

  fireEvent.click(nextButton);
  expect(inputPage).toHaveValue(2);

  fireEvent.click(prevButton);
  expect(inputPage).toHaveValue(1);

  fireEvent.change(inputPage, { target: { value: '3' } });
  fireEvent.click(goToButton);
  expect(inputPage).toHaveValue(3);
});
