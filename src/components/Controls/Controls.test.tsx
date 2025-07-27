import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Controls from './Controls';

test('render Controls', () => {
  const mockFn = vi.fn();

  render(
    <MemoryRouter>
      <Controls onSearch={mockFn} />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText('Enter term');
  expect(input).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /Search Button/ });
  expect(button).toBeInTheDocument();
});

test('updates state on input change', () => {
  const mockFn = vi.fn();

  render(
    <MemoryRouter>
      <Controls onSearch={mockFn} />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText('Enter term');

  fireEvent.change(input, { target: { value: 'ditto' } });

  expect(input).toHaveValue('ditto');
});

test('test LS', () => {
  const mockFn = vi.fn();
  const mockFnLs = vi.spyOn(window.localStorage.__proto__, 'setItem');

  render(
    <MemoryRouter>
      <Controls onSearch={mockFn} />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText('Enter term');
  fireEvent.change(input, { target: { value: '   ditto    ' } });

  expect(input).toHaveValue('ditto');

  const button = screen.getByRole('button', { name: /Search Button/ });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  expect(mockFn).toHaveBeenCalledWith('ditto', 0);

  expect(mockFnLs).toHaveBeenCalledWith('searchTerm', 'ditto');

  expect(input).toHaveValue('');
});
