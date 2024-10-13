import axios, { AxiosResponse } from 'axios';
import { isRight } from 'fp-ts/These';
import { array, string, Type } from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';
import {
  Recipe, RecipeSchema, Product, ProductSchema, Tag, TagSchema, InstructionSchema,
} from 'src/domain';
import { useQueryClient } from '@tanstack/react-query';
import { ENV } from '../../env';

const instanceAxios = axios.create();

const decode = <A, O>(type: Type<A, O>) => ({ data }: AxiosResponse<unknown>) => {
  const result = type.decode(data);
  if (isRight(result)) {
    return result.right;
  }
  throw new Error(`Decoding error ${PathReporter.report(result)}`);
};

instanceAxios.interceptors.response.use(
  undefined,
  (response) => {
    if (response.response.status === 401) {
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: ['user'] });
      window.location.href = '/login';
    }
    return response;
  },
);

export const getRecipes = (tags?: number[]) => instanceAxios.get(
  '/api/recipes',
  { params: { tags: tags?.join(',') } },
).then(decode(array(RecipeSchema)));

export const deleteRecipe = (recipe: Recipe) => instanceAxios.delete(`/api/recipes/${recipe.id}`);
export const addRecipe = (recipe: Recipe) => instanceAxios.post('/api/recipes', recipe);

export const toFavorites = (recipeId: number) => instanceAxios.post(`/api/recipes/favorites/${recipeId}`);
export const fromFavorites = (recipeId: number) => instanceAxios.post(`/api/recipes/non-favorites/${recipeId}`);

export const getInstructions = (recipeId: number) => instanceAxios.get(
  `/api/recipes/${recipeId}/instructions`,
).then(decode(array(InstructionSchema)));

export const getProducts = () => instanceAxios.get('/api/products').then(decode(array(ProductSchema)));
export const addProduct = (product: Product) => instanceAxios.post('/api/products', product);

export const getTags = () => instanceAxios.get('/api/tags').then(decode(array(TagSchema)));
export const addTag = (tag: Tag) => instanceAxios.post('/api/tags', tag);

export const getRandomRecipe = (tags?: number[]) => instanceAxios
  .get('/api/recipes/random', tags?.length ? { params: { tags: tags.join(',') } } : undefined)
  .then(decode(RecipeSchema));

export const upload = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return instanceAxios
    .post('/api/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(decode(string));
};

export const getUser = () => instanceAxios.get('/api/user', {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}).then((res) => res.data);

export const getLoginUrl = () => `${ENV.VITE_API_URL}/api/private`;

export const logout = () => instanceAxios.post('/api/logout');
