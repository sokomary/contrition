import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';
import { ReactComponent as GoogleIcon } from '../assets/icons/google-icon.svg';
import { Container } from './ui/Container';
import { useAuthenticate } from '../hooks/useAuthenticate';
import i18next from '../i18next';
import { Button } from './ui/Button';
import { getLoginUrl } from '../api/api';

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
      toast(<>Не удалось получить ссылку</>, { type: 'error' });
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
