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
  calories: number | null;
  protein: number | null;
  fats: number | null;
  carbohydrates: number | null;
  tags: Tag[];
  size: number | null;
  img?: string;
  pressignedUrl?: string;
  recipeProducts: RecipeProduct[];
  instructions?: Instruction[];
  favorite?: boolean;
  portionSize?: number | null;
  ownerId: number;
};
