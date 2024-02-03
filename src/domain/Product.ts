import {
  number, string, type, TypeOf,
} from 'io-ts';

export const ProductSchema = type({
  id: number,
  name: string,
  calories: number,
  protein: number,
  fats: number,
  carbohydrates: number,
}, 'ProductSchema');

export type Product = TypeOf<typeof ProductSchema>;
