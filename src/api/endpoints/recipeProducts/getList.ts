import { RecipeProduct } from 'src/types/domain';
import { api } from 'src/api';

type GetRecipeProductsParams = {
  menuId: number;
};

// todo pagination
export const getList = ({ menuId }: GetRecipeProductsParams) =>
  api
    .get<any, { data: RecipeProduct[] }>(`/api/menu/${menuId}/products`)
    .then(({ data }) => data);
