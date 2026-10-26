import { Recipe } from './Recipe';
import { Kind } from './Kind';

export type Meal = {
  id: number;
  date: string;
  recipe: Recipe | null;
  kind: Kind;
};
