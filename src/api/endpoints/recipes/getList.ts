import { Recipe } from 'src/types/domain';
import { api } from 'src/api';

type GetRecipesParams = {
  tags?: number[];
  limit?: number;
  offset?: number;
  query?: string;
};

export const getList = ({ tags, limit, offset, query }: GetRecipesParams) =>
  api
    .get<any, { data: { content: Recipe[]; limit: number; offset: number } }>(
      '/api/recipes',
      {
        params: { tags: tags?.join(','), limit, offset, query },
      },
    )
    .then(({ data }) => data);
