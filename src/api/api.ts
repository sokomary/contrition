import axios from 'axios';
import { onRejected, prepareConfig } from './api.helpers';

const createApiClient = () => {
  const apiClient = axios.create({ withCredentials: true });

  apiClient.interceptors.response.use(undefined, onRejected);

  apiClient.interceptors.request.use((config) => prepareConfig(config));

  return apiClient;
};

export const api = createApiClient();
