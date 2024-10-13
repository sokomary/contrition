import React from 'react';
import { toast } from 'react-toastify';
import { getLoginUrl } from 'src/api';
import { useAuthenticate } from 'src/hooks';
import i18next from 'src/formatter';

export const useLogic = () => {
  const authenticated = useAuthenticate();

  const loginUrl = getLoginUrl();

  const login = () => {
    console.log('loginUrl: ', loginUrl);
    if (loginUrl) {
      window.location.href = loginUrl;
    } else {
      toast(<>{i18next.t('loginpage:errors.url')}</>, { type: 'error' });
    }
  };

  return {
    authenticated,
    login,
  };
};
