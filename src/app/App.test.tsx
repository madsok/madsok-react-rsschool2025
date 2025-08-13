import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('render App', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const element = screen.getByText(/About page/);
  expect(element).toBeInTheDocument();
});
