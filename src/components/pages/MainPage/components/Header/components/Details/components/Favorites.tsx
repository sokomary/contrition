import React from 'react';
import { Recipe } from 'src/types/domain';
import { Card } from './Card';
import { RecipeCard } from '../../../../RecipeCard';
import * as css from './Favorites.css';

type Props = {
  recipes: Recipe[];
};

export const Favorites = ({ recipes }: Props) => (
  <Card
    layout="horizontal"
    title="Избранные рецепты"
    items={recipes.map((recipe) => (
      <RecipeCard small key={recipe.id} recipe={recipe} />
    ))}
    className={css.container}
  />
);
