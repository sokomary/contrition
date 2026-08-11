import { api } from 'src/api';

type RecipeToFavouritesParams = {
  recipeId: number;
};

export const toFavourites = ({ recipeId }: RecipeToFavouritesParams) =>
  api.post(`/api/recipes/favorites/${recipeId}`);
