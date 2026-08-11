import { Tag } from 'src/types/domain';
import { api } from 'src/api';

// todo pagination
export const getList = () =>
  api.get<any, { data: Tag[] }>('/api/tags').then(({ data }) => data);
