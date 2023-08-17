import {
  type, string, number, TypeOf, array,
} from 'io-ts';
import { ProductSchema } from './Product';
import { TagSchema } from './Tag';

const RecipeProductSchema = type({
  product: ProductSchema,
  quantity: number,
}, 'RecipeProductSchema');
type RecipeProduct = TypeOf<typeof RecipeProductSchema>;

const RecipeSchema = type({
  id: number,
  name: string,
  link: string,
  calories: number,
  protein: number,
  fats: number,
  carbohydrates: number,
  tags: array(TagSchema),
  size: number,
  img: string,
  recipeProducts: array(RecipeProductSchema),
}, 'RecipeSchema');

type Recipe = TypeOf<typeof RecipeSchema>;

export type { Recipe, RecipeProduct };
export { RecipeSchema };
