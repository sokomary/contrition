import React, { FC } from 'react';
import './App.css';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { messages } from './messages';
import { StartPage } from './components/start/StartPage';
import { routs } from './routs';

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: keyof typeof messages;
    }
  }
}

const App: FC = () => (
  <IntlProvider messages={messages} locale="ru" defaultLocale="ru">
    <StyledApp>
      <Router>
        <Routes>
          <Route path="*" element={<StartPage />} />
          <Route path={routs.START} element={<StartPage />} />
        </Routes>
      </Router>
    </StyledApp>
  </IntlProvider>
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
