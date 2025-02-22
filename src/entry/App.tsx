import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthenticate } from 'src/api/useAuthenticate';
import { QueryProvider } from 'src/api';
import { ROUTES } from 'src/router';
import { MainPage } from 'src/components/pages/MainPage';
import { LoginPage } from 'src/components/pages/LoginPage';
import ReactDOM from 'react-dom/client';
import { Modals } from './components/Modals';
import * as css from './App.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
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
              <Route path={ROUTES.start} element={<MainPage />} />
              <Route path={ROUTES.login} element={<LoginPage />} />
            </>
          ) : (
            <Route path="*" element={<LoginPage />} />
          )}
        </Routes>
        <Modals />
      </Router>
    </>
  );
};

root.render(
  <div className={css.root}>
    <CookiesProvider>
      <React.StrictMode>
        <QueryProvider>
          <Content />
          <div id="modals-root" />
        </QueryProvider>
      </React.StrictMode>
    </CookiesProvider>
  </div>
);
