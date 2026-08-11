import { Kind } from 'src/types/domain';
import { api } from 'src/api';

export const getList = () =>
  api.get<any, { data: Kind[] }>('/api/kinds').then(({ data }) => data);
