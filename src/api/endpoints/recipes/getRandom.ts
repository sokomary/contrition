import { Recipe } from 'src/types/domain';
import { api } from 'src/api';

type GetRandomRecipeParams = {
  tags?: number[];
};

export const getRandom = ({ tags }: GetRandomRecipeParams) =>
  api
    .get<any, { data: Recipe }>(
      '/api/recipes/random',
      tags?.length ? { params: { tags: tags.join(',') } } : undefined,
    )
    .then(({ data }) => data);
