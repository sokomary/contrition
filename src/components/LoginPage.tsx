import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { ReactComponent as GoogleIcon } from '../assets/icons/google-icon.svg';
import { Container } from './ui/Container';
import { useAuthenticate } from '../hooks/useAuthenticate';
import i18next from '../i18next';
import { Button } from './ui/Button';
import { getLoginUrl } from '../api/api';
import { color } from './ui/theme';

const LoginPage = () => {
  const authenticated = useAuthenticate();

  const { data: loginUrl } = useQuery(
    'login-url',
    getLoginUrl,
  );

  const login = () => {
    if (loginUrl) {
      window.location.href = loginUrl;
    } else {
      toast(<>{i18next.t('loginpage:errors.url')}</>, { type: 'error' });
    }
  };

  return (
    <Content>
      {!authenticated && (
        <LoginButton onClick={login} size="large">
          <Container gap={11}>
            <GoogleIcon />
            <div>{i18next.t('loginpage:actions.login.google')}</div>
          </Container>
        </LoginButton>
      )}
    </Content>
  );
};

const Content = styled(Container)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${color('background')};
`;

const LoginButton = styled(Button)`
  animation-duration:  1s;
  animation-name: loginButton;
  @keyframes loginButton {
    0% {
      margin-left: -3000px;
    }
    100% {
      margin-left: 0;
    }
  }
`;

export default LoginPage;
