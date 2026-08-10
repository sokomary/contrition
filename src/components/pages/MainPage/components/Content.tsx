import React from 'react';
import { useTranslation } from 'react-i18next';
import { Recipe } from 'src/types/domain';
import { RecipeCard } from './RecipeCard';
import * as css from './Content.css';

type Props = {
  recipes: Recipe[];
};

export const Content = ({ recipes }: Props) => {
  const { t } = useTranslation();

  if (!recipes.length) {
    return <p className={css.emptyState}>{t('startpage.recipes.empty')}</p>;
  }

  return (
    <div className={css.container}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};
