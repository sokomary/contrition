import { Product } from 'src/types/domain';
import { api } from 'src/api';

// todo pagination
export const getList = () =>
  api.get<any, { data: Product[] }>('/api/products').then(({ data }) => data);
