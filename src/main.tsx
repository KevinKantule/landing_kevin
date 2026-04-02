import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { GoogleAnalytics } from './components/GoogleAnalytics.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <GoogleAnalytics />
      <App />
    </HelmetProvider>
  </StrictMode>,
);
