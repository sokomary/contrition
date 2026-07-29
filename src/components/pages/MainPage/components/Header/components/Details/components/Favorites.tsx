import React from 'react';
import { useTranslation } from 'react-i18next';
import { Recipe } from 'src/types/domain';
import { Card } from './Card';
import { RecipeCard } from '../../../../RecipeCard';
import * as css from './Favorites.css';

type Props = {
  recipes: Recipe[];
};

export const Favorites = ({ recipes }: Props) => {
  const { t } = useTranslation();

  return (
    <Card
      layout='horizontal'
      title={t('startpage.recipes.favorites.title')}
      items={recipes.map((recipe) => (
        <RecipeCard small key={recipe.id} recipe={recipe} />
      ))}
      className={css.container}
    />
  );
};
