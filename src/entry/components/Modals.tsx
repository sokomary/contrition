import React from 'react';
import {
  GetRandomRecipe,
  Menu,
  RecipeNew,
  RecipeEdit,
} from 'src/components/modals';

export type ModalRouts = {
  menu: 'true';
  'random-recipe': 'true';
  'recipe-new': 'true';
  'recipe-edit': string;
};

export const Modals = () => (
  <>
    <GetRandomRecipe />
    <Menu />
    <RecipeNew />
    <RecipeEdit />
  </>
);
