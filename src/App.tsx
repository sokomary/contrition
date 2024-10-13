import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthenticate } from 'src/hooks/useAuthenticate';
import { QueryProvider } from 'src/api';
import { routs } from 'src/routs';
import { MainPage } from 'src/components/pages/MainPage';
import { LoginPage } from 'src/components/pages/LoginPage';
import ReactDOM from 'react-dom/client';
import * as css from './App.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Content = () => {
  const authenticated = useAuthenticate();
  return (
    <>
      <ToastContainer position="bottom-center" theme="colored" />
      <Router>
        <Routes>
          {authenticated ? (
            <>
              <Route path="*" element={<MainPage />} />
              <Route path={routs.START} element={<MainPage />} />
            </>
          ) : (
            <Route path="*" element={<LoginPage />} />
          )}
        </Routes>
      </Router>
      <div id="modals-root" />
    </>
  );
};

root.render(
  <div className={css.root}>
    <CookiesProvider>
      <React.StrictMode>
        <QueryProvider>
          <Content />
        </QueryProvider>
      </React.StrictMode>
    </CookiesProvider>
  </div>,
);
