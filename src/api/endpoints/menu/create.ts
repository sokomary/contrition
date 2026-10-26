import { api } from 'src/api';

type CreateMenuParams = {
  id?: number;
  dateStart: string;
  dateEnd: string;
  meals: {
    id?: number;
    date: string;
    recipeId: number | null;
    kindId: number;
  }[];
};

export const create = (menu: CreateMenuParams) => api.post('/api/menu', menu);
