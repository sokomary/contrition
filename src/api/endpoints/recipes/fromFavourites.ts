import { api } from 'src/api';

type RecipeFromFavouritesParams = {
  recipeId: number;
};

export const fromFavourites = ({ recipeId }: RecipeFromFavouritesParams) =>
  api.post(`/api/recipes/non-favorites/${recipeId}`);
