import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getLoginUrl, useAuthenticate } from 'src/api';
import i18next from 'src/formatter';
import { isEmpty } from 'lodash';
import { useLocation, useNavigate } from 'src/router';

export const useLogic = () => {
  const { search } = useLocation();
  const { navigate } = useNavigate();

  useEffect(() => {
    if (!isEmpty(search)) {
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
