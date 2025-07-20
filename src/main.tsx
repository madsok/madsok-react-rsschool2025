import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

const root = document.querySelector('#root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary fallback={<p>UI Error has happened</p>}>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}
