import { api } from 'src/api';

type CreateTagParams = {
  name: string;
};

export const create = (tag: CreateTagParams) => api.post('/api/tags', tag);
