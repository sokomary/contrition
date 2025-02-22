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
  Confirmation,
} from 'src/components/modals';

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
    <Confirmation />
  </>
);
