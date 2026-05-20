import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getLoginUrl, useAuthenticate } from 'src/api';
import { isEmpty } from 'lodash';
import { useLocation, useNavigate } from 'src/router';
import { useTranslation } from 'react-i18next';

export const useLogic = () => {
  const { search } = useLocation();
  const { navigate } = useNavigate();
  const { t } = useTranslation();

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
      toast(<>{t('loginpage.errors.url')}</>, { type: 'error' });
    }
  };

  return {
    authenticated,
    login,
  };
};
