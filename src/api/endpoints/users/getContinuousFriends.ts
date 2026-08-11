import { User } from 'src/types/domain';
import { api } from 'src/api';

export const getContinuousFriends = () =>
  api
    .get<any, { data: User[] }>('/api/recipes/share/continuous')
    .then(({ data }) => data);
