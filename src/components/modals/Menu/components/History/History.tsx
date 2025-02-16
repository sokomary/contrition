import React from 'react';
import { Meal, Menu } from 'src/types/domain';
import * as css from './History.css';

type Props = {
  menu: Menu[];
};

export const History = ({ menu }: Props) => (
  <div className={css.container}>
    {!menu.length && <div>В истории пока пусто</div>}

    {menu.map((m, i) => (
      <div key={i} className={css.ccc}>
        <div className={css.header}>
          {m.dateStart} - {m.dateEnd}
        </div>
        <div className={css.content}>
          <Meals meals={m.meals || []} />
        </div>
      </div>
    ))}
  </div>
);

const Meals = ({ meals }: { meals: Meal[] }) => {
  const dates = Array.from(new Set(meals.map((meal) => meal.date))).sort();

  return (
    <>
      {dates.map((date) => (
        <div key={date} className={css.recipe}>
          {meals
            .filter((meal) => meal.date === date)
            .map((meal) => meal.recipe.name)
            .join(', ')}
        </div>
      ))}
    </>
  );
};
