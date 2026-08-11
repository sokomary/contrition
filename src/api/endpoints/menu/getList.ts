import { Menu } from 'src/types/domain';
import { api } from 'src/api';

export const getList = () =>
  api.get<any, { data: Menu[] }>('/api/menu').then(({ data }) => data);
