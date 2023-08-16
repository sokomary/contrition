import {
  number, string, type, TypeOf,
} from 'io-ts';

const ProductSchema = type({
  id: number,
  name: string,
  calories: number,
  protein: number,
  fats: number,
  carbohydrates: number,
}, 'ProductSchema');

type Product = TypeOf<typeof ProductSchema>;

export type { Product };
export { ProductSchema };
