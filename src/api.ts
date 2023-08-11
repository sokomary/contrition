import axios, { AxiosResponse } from 'axios';
import { isRight } from 'fp-ts/These';
import {
  array,
  Type,
} from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';
import { Recipe, RecipeSchema } from './domain/Recipe';
import { Product, ProductSchema } from './domain/Product';
import { Tag, TagSchema } from './domain/Tag';

const instanceAxios = axios.create();

const decode = <A, O>(type: Type<A, O>) => ({ data }: AxiosResponse<unknown>) => {
  const result = type.decode(data);
  if (isRight(result)) {
    return result.right;
  }
  throw new Error(`Decoding error ${PathReporter.report(result)}`);
};

// const serverUrl = 'https://88.218.61.83:8443';
const serverUrl = 'https://localhost:8443';

const API = {
  getRecipes: () => instanceAxios.get(`${serverUrl}/recipes`).then(decode(array(RecipeSchema))),
  addRecipe: (recipe: Recipe) => instanceAxios.post(`${serverUrl}/recipes`, recipe),
  deleteRecipe: (recipe: Recipe) => instanceAxios.delete(`${serverUrl}/recipes/${recipe.id}`),

  getProducts: () => instanceAxios.get(`${serverUrl}/products`).then(decode(array(ProductSchema))),
  addProduct: (product: Product) => instanceAxios.post(`${serverUrl}/products`, product),

  getTags: () => instanceAxios.get(`${serverUrl}/tags`).then(decode(array(TagSchema))),
  addTag: (tag: Tag) => instanceAxios.post(`${serverUrl}/tags`, tag),
};

export { API };
