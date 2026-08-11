import { FriendRecipes } from 'src/types/domain';
import { api } from 'src/api';

export const getList = () =>
  api
    .get<any, { data: FriendRecipes[] }>(`/api/recipes/shared/recipients`)
    .then(({ data }) => data);
