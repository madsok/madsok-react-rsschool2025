import { render } from '@testing-library/react';
import { test } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import App from '../../app/[locale]/page';

test('render ErrorBoundary', () => {
  render(
    <ErrorBoundary fallback={<p>UI Error has happened</p>}>
      <App />
    </ErrorBoundary>
  );
});
