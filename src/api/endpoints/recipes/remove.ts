import { api } from 'src/api';

type RemoveRecipeParams = {
  id: number;
};
export const remove = ({ id }: RemoveRecipeParams) =>
  api.delete(`/api/recipes/${id}`);
