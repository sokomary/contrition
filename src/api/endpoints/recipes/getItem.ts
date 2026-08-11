import { Recipe } from 'src/types/domain';
import { api } from 'src/api';

type GetRecipeParams = {
  id: number;
};
export const getItem = ({ id }: GetRecipeParams) =>
  api.get<any, { data: Recipe }>(`/api/recipes/${id}`).then(({ data }) => data);
