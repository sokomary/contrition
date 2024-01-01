import React, { FC } from 'react';
import './App.css';
import styled from 'styled-components';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer } from 'react-toastify';
import { StartPage } from './components/start/StartPage';
import { routs } from './routs';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'react-tooltip/dist/react-tooltip.css';
import { QueryProvider } from './api/QueryProvider';
import { useAuthenticate } from './hooks/useAuthenticate';
import LoginPage from './components/LoginPage';
import { color } from './components/ui/theme';

const App: FC = () => (
  <QueryProvider><Content /></QueryProvider>
);

const Content = () => {
  const authenticated = useAuthenticate();
  return (
    <StyledApp>
      <StyledContainer position="bottom-center" theme="colored" />
      <Router>
        <Routes>
          { authenticated ? (
            <>
              <Route path="*" element={<StartPage />} />
              <Route path={routs.START} element={<StartPage />} />
              <Route path={routs.LOGIN} element={<LoginPage />} />
            </>
          ) : (
            <Route path="*" element={<LoginPage />} />
          )}
        </Routes>
      </Router>
    </StyledApp>
  );
};

const StyledApp = styled.div`
  height: 100vh;
  overflow: auto;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  background-color: ${color('background')};
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const StyledContainer = styled(ToastContainer)`
  // https://styled-compo nents.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
    margin-bottom: 70px;
  }
  .Toastify__toast {
    border-radius: 30px;
    background-color: ${color('success')};
  }
  .Toastify__toast--error {
    border-radius: 30px;
    background-color: ${color('danger')};
  }
  .Toastify__toast-body {
    color: white;
    padding: 0 15px;
  }
  .Toastify__close-button {
    margin-right: 15px;
    margin-top: 15px;
  }
`;

export default App;
