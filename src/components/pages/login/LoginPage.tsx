import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { getLoginUrl } from 'src/api';
import { GoogleIcon } from 'src/assets';
import { useAuthenticate } from 'src/hooks';
import { Container, Button } from 'src/components/features';
import i18next from 'src/formatter';
import { color } from 'src/theme';

export const LoginPage = () => {
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
          <LoginButtonContent gap={11}>
            <GoogleIcon />
            <div>{i18next.t('loginpage:actions.login.google')}</div>
          </LoginButtonContent>
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

const LoginButtonContent = styled(Container)`
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
