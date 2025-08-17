import { render } from '@testing-library/react';
import QueryProvider from './QueryProvider';

describe('QueryProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <QueryProvider>
        <div>children</div>
      </QueryProvider>
    );

    expect(getByText('children')).toBeTruthy();
  });
});
