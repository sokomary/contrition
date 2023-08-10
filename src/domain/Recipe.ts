import {
  type, string, number, TypeOf,
} from 'io-ts';

const RecipeSchema = type({
  id: number,
  name: string,
  link: string,
  calories: number,
  protein: number,
  fats: number,
  carbohydrates: number,
}, 'RecipeSchema');

type Recipe = TypeOf<typeof RecipeSchema>;

export type { Recipe };
export { RecipeSchema };
