import { api } from 'src/api';

type CreateMenuParams = {
  dateStart: string;
  dateEnd: string;
  meals: {
    date: string;
    recipeId: number;
    kindId: number;
  }[];
};

export const create = (menu: CreateMenuParams) => api.post('/api/menu', menu);
