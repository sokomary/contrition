import { api } from 'src/api';

export const logout = () => api.post('/api/logout');
