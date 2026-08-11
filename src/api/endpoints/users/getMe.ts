import { User } from 'src/types/domain';
import { api } from 'src/api';

export const getMe = () =>
  api
    .get<any, { data: User }>('/api/user', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => data);
