import React, { FC } from 'react';
import './App.css';
import styled from 'styled-components';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { StartPage } from './components/start/StartPage';
import { routs } from './routs';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App: FC = () => (
  <StyledApp>
    <Router>
      <Routes>
        <Route path="*" element={<StartPage />} />
        <Route path={routs.START} element={<StartPage />} />
      </Routes>
    </Router>
  </StyledApp>
);

const StyledApp = styled.div`
  height: 100vh;
  overflow: auto;

  font-family: 'Roboto', sans-serif;
  font-size: 14px;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default App;
