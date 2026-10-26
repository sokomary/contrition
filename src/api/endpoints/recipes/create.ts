import { api } from 'src/api';
import { Instruction, RecipeProduct, Tag } from '../../../types/domain';

type CreateRecipeParams = {
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

export const create = (recipe: CreateRecipeParams) =>
  api.post('/api/recipes', recipe);
