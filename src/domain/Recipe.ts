import {
  type, string, number, TypeOf, array, union,
} from 'io-ts';
import { ProductSchema } from './Product';
import { TagSchema } from './Tag';
import { UndefinedType } from './UndefinedType';
import { InstructionSchema } from './Instruction';

const RecipeProductSchema = type({
  id: number,
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
  img: union([string, UndefinedType]),
  pressignedUrl: union([string, UndefinedType]),
  recipeProducts: array(RecipeProductSchema),
  instructions: union([array(InstructionSchema), UndefinedType]),
}, 'RecipeSchema');

type Recipe = TypeOf<typeof RecipeSchema>;

export type { Recipe, RecipeProduct };
export { RecipeSchema };
