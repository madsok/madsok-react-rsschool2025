import { render, fireEvent } from '@testing-library/react';
import { test, vi } from 'vitest';
import Pagination from './Pagination';
import { MemoryRouter } from 'react-router-dom';

test('render Pagination', () => {
  const mockFn = vi.fn();

  const { getByText, getByRole } = render(
    <MemoryRouter>
      <Pagination count={132} onPageChange={mockFn} />
    </MemoryRouter>
  );
  const prevButton = getByText(/Previous/);
  const nextButton = getByText(/Next/);
  const goToButton = getByText(/Go to:/);
  const inputPage = getByRole('spinbutton');

  expect(inputPage).toHaveValue(1);

  fireEvent.click(nextButton);
  expect(mockFn).toHaveBeenCalledWith(2);

  fireEvent.click(prevButton);
  expect(mockFn).toHaveBeenCalledWith(1);

  fireEvent.change(inputPage, { target: { value: '3' } });
  fireEvent.click(goToButton);
  expect(mockFn).toHaveBeenCalledWith(3);
});
