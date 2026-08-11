import { Recipe } from 'src/types/domain';
import { api } from 'src/api';

type GetFavouriteRecipesParams = {
  tags?: number[];
  limit?: number;
  offset?: number;
  query?: string;
};

export const getFavourites = ({
  tags,
  limit,
  offset,
  query,
}: GetFavouriteRecipesParams) =>
  api
    .get<any, { data: { content: Recipe[]; limit: number; offset: number } }>(
      '/api/recipes/favorite',
      {
        params: { tags: tags?.join(','), limit, offset, query },
      },
    )
    .then(({ data }) => data);
