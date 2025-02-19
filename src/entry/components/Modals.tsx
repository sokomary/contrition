import React from 'react';
import {
  GetRandomRecipe,
  Menu,
  RecipeNew,
  RecipeEdit,
  AddProduct,
  AddTag,
  ProductInfo,
  RecipeInfo,
} from 'src/components/modals';

export type ModalRouts = {
  menu: 'true';
  'random-recipe': 'true';
  'recipe-new': 'true';
  'recipe-edit': string;
  'product-new': 'true';
  'product-info': string;
  'recipe-info': string;
  'tag-new': 'true';
};

export const Modals = () => (
  <>
    <GetRandomRecipe />
    <Menu />
    <RecipeNew />
    <RecipeEdit />
    <AddProduct />
    <AddTag />
    <ProductInfo />
    <RecipeInfo />
  </>
);
