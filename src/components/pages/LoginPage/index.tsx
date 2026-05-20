import React from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleIcon } from 'src/assets';
import { Button } from 'src/components/features';
import { useLogic } from './useLogic';
import * as css from './index.css';

export const LoginPage = () => {
  const { t } = useTranslation();
  const { authenticated, login } = useLogic();

  if (authenticated) {
    return null;
  }

  return (
    <div className={css.container}>
      <Button className={css.button} onClick={login} size='large'>
        <div className={css.loginButtonContent}>
          <GoogleIcon />
          <div>{t('loginpage.actions.login.google')}</div>
        </div>
      </Button>
    </div>
  );
};
