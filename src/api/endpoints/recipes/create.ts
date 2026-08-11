import { api } from 'src/api';
import { Instruction, RecipeProduct, Tag } from '../../../types/domain';

type CreateRecipeParams = {
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
  ownerId: number;
};

export const create = (recipe: CreateRecipeParams) =>
  api.post('/api/recipes', recipe);
