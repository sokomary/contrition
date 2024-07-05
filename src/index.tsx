import React from 'react';
import ReactDOM from 'react-dom/client';
import 'src/index.css';
import { CookiesProvider } from 'react-cookie';
import App from 'src/App';
import reportWebVitals from 'src/reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <div style={{ backgroundColor: 'black' }}>
    <CookiesProvider>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </CookiesProvider>
  </div>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
