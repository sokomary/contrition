import axios from 'axios';
import {
  Recipe,
  Product,
  Kind,
  Tag,
  Instruction,
  User,
  Menu,
  Meal,
  RecipeProduct,
} from 'src/types/domain';
import { useQueryClient } from '@tanstack/react-query';
import { ENV } from '../../env';

const instanceAxios = axios.create();

instanceAxios.interceptors.response.use(
  (response) => response.data,
  (response) => {
    if (response.response.status === 401) {
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: ['user'] });
      window.location.href = '/login';
    }
    return response;
  }
);

export const getRecipes = (tags?: number[]) =>
  instanceAxios.get<any, Recipe[]>('/api/recipes', {
    params: { tags: tags?.join(',') },
  });

export const getMenu = () => instanceAxios.get<any, Menu[]>('/api/menu', {});
export const getKinds = () => instanceAxios.get<any, Kind[]>('/api/kinds');

export const getRecipe = (id: number) =>
  instanceAxios.get<any, Recipe>(`/api/recipes/${id}`);
export const deleteRecipe = (recipe: Recipe) =>
  instanceAxios.delete(`/api/recipes/${recipe.id}`);
export const addRecipe = (recipe: Recipe) =>
  instanceAxios.post('/api/recipes', recipe);

export const addMenu = (
  menu: Omit<Menu, 'id' | 'meals'> & { meals: Omit<Meal, 'id'>[] }
) => instanceAxios.post('/api/menu', menu);

export const getMenuProducts = (menuId: number) =>
  instanceAxios.get<any, RecipeProduct[]>(`/api/menu/${menuId}/products`);

export const toFavorites = (recipeId: number) =>
  instanceAxios.post(`/api/recipes/favorites/${recipeId}`);
export const fromFavorites = (recipeId: number) =>
  instanceAxios.post(`/api/recipes/non-favorites/${recipeId}`);

export const getInstructions = (recipeId: number) =>
  instanceAxios.get<any, Instruction[]>(
    `/api/recipes/${recipeId}/instructions`
  );
export const getProducts = () =>
  instanceAxios.get<any, Product[]>('/api/products');
export const addProduct = (product: Product) =>
  instanceAxios.post('/api/products', product);

export const getTags = () => instanceAxios.get<any, Tag[]>('/api/tags');
export const addTag = (tag: Tag) => instanceAxios.post('/api/tags', tag);

export const getRandomRecipe = (tags?: number[]) =>
  instanceAxios.get<any, Recipe>(
    '/api/recipes/random',
    tags?.length ? { params: { tags: tags.join(',') } } : undefined
  );

export const upload = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return instanceAxios.post<any, string>('/api/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getUser = () =>
  instanceAxios.get<any, User>('/api/user', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

export const getLoginUrl = () => `${ENV.VITE_API_URL}/api/private`;

export const logout = () => instanceAxios.post('/api/logout');
