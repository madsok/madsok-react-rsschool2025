import { render } from '@testing-library/react';
import { test } from 'vitest';
import NotFound from './NotFound';

test('render About', () => {
  render(<NotFound />);
});
