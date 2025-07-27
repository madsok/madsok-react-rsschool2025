import { render } from '@testing-library/react';
import { test } from 'vitest';
import About from './About';

test('render About', () => {
  render(<About />);
});
