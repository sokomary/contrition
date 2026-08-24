import { RecipeProduct } from 'src/types/domain';
import { api } from 'src/api';

type GetRecipeProductsParams = {
  menuId: number;
  excludeRecipeIds?: number[];
};

// todo pagination
export const getList = ({
  menuId,
  excludeRecipeIds,
}: GetRecipeProductsParams) =>
  api
    .get<any, { data: RecipeProduct[] }>(`/api/menu/${menuId}/products`, {
      params: {
        excludeRecipeIds: excludeRecipeIds?.length
          ? excludeRecipeIds.join(',')
          : undefined,
      },
    })
    .then(({ data }) => data);
