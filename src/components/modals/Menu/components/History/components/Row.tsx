import { Meal } from 'src/types/domain';
import React from 'react';
import * as css from './Row.css';

export const Row = ({ meals }: { meals: Meal[] }) => {
  const dates = Array.from(new Set(meals.map((meal) => meal.date))).sort();

  return (
    <div className={css.container}>
      {dates.map((date) => (
        <div key={date} className={css.recipe}>
          {meals
            .filter((meal) => meal.date === date)
            .map((meal) => meal.recipe.name)
            .join(', ')}
        </div>
      ))}
    </div>
  );
};
