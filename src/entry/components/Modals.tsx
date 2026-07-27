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
  ShareRecipe,
  ViewSharings,
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
    <ShareRecipe />
    <ViewSharings />
    <Confirmation />
  </>
);
