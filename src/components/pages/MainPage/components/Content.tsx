import React from 'react';
import { Recipe } from 'src/types/domain';
import { useLocation, useNavigate } from 'src/router';
import { RecipeCard } from './RecipeCard';
import * as css from './Content.css';

type Props = {
  recipes: Recipe[];
};

export const Content = ({ recipes }: Props) => {
  const { search } = useLocation();
  const { navigate } = useNavigate();

  const updateMenu = (id: number) =>
    navigate({
      search: {
        ...search,
        select: [...search.select, id],
      },
    });

  if (!recipes.length) {
    return <div className={css.emptyState}>Пока нет рецептов</div>;
  }

  return (
    <div className={css.container}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          showTooltip={!!search.select}
          onAddToMenu={() => updateMenu(recipe.id)}
        />
      ))}
      <div className={css.fakeCard} />
      <div className={css.fakeCard} />
      <div className={css.fakeCard} />
      <div className={css.fakeCard} />
      <div className={css.fakeCard} />
    </div>
  );
};
