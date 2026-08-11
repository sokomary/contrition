import { Recipe } from 'src/types/domain';
import { api } from 'src/api';

type GetSharedRecipesParams = {
  tags?: number[];
  limit?: number;
  offset?: number;
  query?: string;
};

export const getShared = ({
  tags,
  limit,
  offset,
  query,
}: GetSharedRecipesParams) =>
  api
    .get<any, { data: { content: Recipe[]; limit: number; offset: number } }>(
      '/api/recipes/shared',
      {
        params: { tags: tags?.join(','), limit, offset, query },
      },
    )
    .then(({ data }) => data);
