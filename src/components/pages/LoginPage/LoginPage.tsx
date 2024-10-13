import React from 'react';
import { GoogleIcon } from 'src/assets';
import { Button } from 'src/components/features';
import i18next from 'src/formatter';
import * as css from './LoginPage.css';
import { useLogic } from './LoginPage.useLogic';

export const LoginPage = () => {
  const { authenticated, login } = useLogic();

  return (
    <div className={css.container}>
      {!authenticated && (
        <Button className={css.button} onClick={login} size="large">
          <div className={css.loginButtonContent}>
            <GoogleIcon />
            <div>{i18next.t('loginpage:actions.login.google')}</div>
          </div>
        </Button>
      )}
    </div>
  );
};
