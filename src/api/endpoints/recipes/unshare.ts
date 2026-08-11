import { api } from 'src/api';

type UnshareRecipeParams = {
  recipeId: number;
  email: string;
};

export const unshare = ({ recipeId, email }: UnshareRecipeParams) =>
  api.delete(`/api/recipes/${recipeId}/share`, {
    params: { email },
  });
