import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconGoogle } from 'src/assets';
import { Button } from 'src/components/features';
import { useLogic } from './useLogic';
import { Navigate } from 'react-router-dom';
import * as css from './index.css';

export const LoginPage = () => {
  const { t } = useTranslation();
  const { authenticated, login } = useLogic();

  if (authenticated) {
    return <Navigate to='/' />;
  }

  return (
    <main className={css.container}>
      <Button className={css.button} onClick={login} size='large'>
        <span className={css.loginButtonContent}>
          <IconGoogle />
          <span>{t('loginpage.actions.login.google')}</span>
        </span>
      </Button>
    </main>
  );
};
