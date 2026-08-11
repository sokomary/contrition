import { api } from 'src/api';

type CreateProductParams = {
  name: string;
  calories: number;
  protein: number;
  fats: number;
  carbohydrates: number;
};

export const create = (product: CreateProductParams) =>
  api.post('/api/products', product);
