import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getLoginUrl } from 'src/api';
import { useAuthenticate, useLocation, useNavigate } from 'src/hooks';
import i18next from 'src/formatter';
import { isEmpty } from 'lodash';

export const useLogic = () => {
  const { search } = useLocation();
  const { navigate } = useNavigate();

  useEffect(() => {
    if (!isEmpty(search)) {
      console.log('navigating');
      navigate({ to: 'login', keepPreviousSearch: false });
    }
  }, [search, navigate]);

  const authenticated = useAuthenticate();

  const loginUrl = getLoginUrl();

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
