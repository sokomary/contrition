import { api } from 'src/api';

type ShareRecipeParams = {
  recipeId: number;
  email: string;
};

export const share = ({ recipeId, email }: ShareRecipeParams) =>
  api.post(`/api/recipes/${recipeId}/share`, null, {
    params: { email },
  });
