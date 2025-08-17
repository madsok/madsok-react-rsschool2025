import { render } from '@testing-library/react';
import { test } from 'vitest';
import About from './page';

test('render About', () => {
  render(<About />);
});
