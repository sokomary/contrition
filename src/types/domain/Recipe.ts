import { Product } from './Product';
import { Tag } from './Tag';
import { Instruction } from './Instruction';

export type RecipeProduct = {
  id: number;
  product: Product;
  quantity: number;
};

export type Recipe = {
  id: number;
  name: string;
  comment?: string;
  link: string;
  calories: number;
  protein: number;
  fats: number;
  carbohydrates: number;
  tags: Tag[];
  size: number;
  img?: string;
  pressignedUrl?: string;
  recipeProducts: RecipeProduct[];
  instructions?: Instruction[];
  favorite?: boolean;
  portionSize?: number;
};
