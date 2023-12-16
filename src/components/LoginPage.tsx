import React from 'react';
import styled from 'styled-components';
import { ReactComponent as GoogleIcon } from '../assets/icons/google-icon.svg';
import { Container } from './ui/Container';
import { useAuthenticate } from '../hooks/useAuthenticate';
import i18next from '../i18next';
import { Button } from './ui/Button';

const LoginPage = () => {
  const authenticated = useAuthenticate();

  const login = () => {
    window.location.href = `https://${window.location.hostname}:8443/api/private`;
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
