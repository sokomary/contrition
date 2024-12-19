import {
  type, string, number, TypeOf, array, union, boolean,
} from 'io-ts';
import { ProductSchema } from './Product';
import { TagSchema } from './Tag';
import { UndefinedType } from './UndefinedType';
import { InstructionSchema } from './Instruction';

export const RecipeProductSchema = type({
  id: number,
  product: ProductSchema,
  quantity: number,
}, 'RecipeProductSchema');
export type RecipeProduct = TypeOf<typeof RecipeProductSchema>;

export const RecipeSchema = type({
  id: number,
  name: string,
  comment: union([string, UndefinedType]),
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
  favorite: union([boolean, UndefinedType]),
}, 'RecipeSchema');

export type Recipe = TypeOf<typeof RecipeSchema>;
