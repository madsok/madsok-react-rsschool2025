import type { ReactNode } from 'react';
import QueryProvider from './QueryProvider';

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

export default AppLayout;
