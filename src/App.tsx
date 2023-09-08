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
import 'react-tooltip/dist/react-tooltip.css';
import { BackgroundPage } from './components/BackgroundPage';
import back from './assets/background.png';

const App: FC = () => (
  <StyledApp>
    <Router>
      <BackgroundPage background={back}>
        <Routes>
          <Route path="*" element={<StartPage />} />
          <Route path={routs.START} element={<StartPage />} />
        </Routes>
      </BackgroundPage>
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
