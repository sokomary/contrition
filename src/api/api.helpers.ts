import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { upperFirst } from 'lodash';
import { Response } from './api.types';
import { ENV } from '../../env';
import { queryClient } from './QueryProvider.queryClient';

export const onRejected = (error: AxiosError<Response>) => {
  const { response } = error;

  if (response?.status) {
    switch (response.status) {
      case 401: {
        if (window.location.pathname !== '/login') {
          queryClient.removeQueries({ queryKey: ['user'] });
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      case 404: {
        toast.error('Something went wrong');
        return Promise.reject(error);
      }

      default: {
        let message = 'Something went wrong';

        if (response.data.attributes) {
          message = parseValue(response.data.attributes);
        }
        if (response.data.messages?.[0]) {
          message = response.data.messages?.[0];
        }

        toast.error(upperFirst(message));
        return Promise.reject(error);
      }
    }
  }

  return Promise.reject(error);
};

export const prepareConfig = (config: InternalAxiosRequestConfig) => {
  const { data, headers } = config;

  // const accessToken = localStorage.getItem('accessToken');
  // if (headers && accessToken) {
  //   headers['X-Access-Token'] = accessToken;
  // }

  return { ...config, data, headers };
};

const parseValue = (value: object | string) => {
  if (typeof value === 'string') return value;
  return parseValue(Object.values(value)[0]);
};

export const getLoginUrl = () => `${ENV.VITE_API_URL}/api/private`;
