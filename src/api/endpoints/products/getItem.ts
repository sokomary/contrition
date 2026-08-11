import { Product } from 'src/types/domain';
import { api } from 'src/api';

type GetProductParams = {
  id: number;
};
export const getItem = ({ id }: GetProductParams) =>
  api
    .get<any, { data: Product }>(`/api/products/${id}`)
    .then(({ data }) => data);
