import React from 'react';
import { GetRandomRecipe, Menu } from 'src/components/modals';

export const ROUT_MODALS = {
  menu: ['true'],
  'random-recipe': ['true'],
} as const;

export const Modals = () => (
  <>
    <Menu />
    <GetRandomRecipe />
  </>
);
