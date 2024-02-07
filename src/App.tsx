import React, { FC } from 'react';
import 'src/App.css';
import styled, { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'react-tooltip/dist/react-tooltip.css';
import { useAuthenticate } from 'src/hooks/useAuthenticate';
import { QueryProvider } from 'src/api';
import { routs } from 'src/routs';
import { MainPage } from 'src/components/pages/main';
import { LoginPage } from 'src/components/pages/login';
import { color } from './theme';
import { useSystemThemeMode } from './hooks';

const App: FC = () => (
  <QueryProvider><Content /></QueryProvider>
);

const Content = () => {
  const authenticated = useAuthenticate();
  const theme = useSystemThemeMode();
  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledApp>
        <StyledContainer position="bottom-center" theme="colored" />
        <Router>
          <Routes>
            { authenticated ? (
              <>
                <Route path="*" element={<MainPage />} />
                <Route path={routs.START} element={<MainPage />} />
                <Route path={routs.LOGIN} element={<LoginPage />} />
              </>
            ) : (
              <Route path="*" element={<LoginPage />} />
            )}
          </Routes>
        </Router>
      </StyledApp>
    </ThemeProvider>
  );
};

const StyledApp = styled.div`
  height: 100vh;
  overflow: auto;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  background-color: ${({ theme }) => color('background', theme)};
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
