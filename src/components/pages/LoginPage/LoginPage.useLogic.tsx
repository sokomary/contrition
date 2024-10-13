import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { getLoginUrl } from 'src/api';
import { useAuthenticate } from 'src/hooks';
import i18next from 'src/formatter';

export const useLogic = () => {
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

  return {
    authenticated,
    login,
  };
};
