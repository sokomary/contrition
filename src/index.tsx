import React from 'react';
import ReactDOM from 'react-dom/client';
import 'src/index.css';
import { CookiesProvider } from 'react-cookie';
import App from 'src/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <div>
    <CookiesProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CookiesProvider>
  </div>,
);
