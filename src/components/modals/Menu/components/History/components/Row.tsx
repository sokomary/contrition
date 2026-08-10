import React from 'react';
import { ActionBar } from 'src/components/features';
import { Products } from '../../CurrentMenu/components/Products';
import { Options, useLogic } from './Row.useLogic';
import * as css from './Row.css';

export const Row = ({ menu }: Options) => {
  const { actions, dates, products, open } = useLogic({ menu });

  return (
    <div className={css.container}>
      <ul className={css.content}>
        {dates.map((date) => (
          <li key={date} className={css.recipe}>
            {menu.meals
              ?.filter((meal) => meal.date === date)
              .map((meal) => meal.recipe.name)
              .join(', ')}
          </li>
        ))}
      </ul>

      <div>
        <ActionBar actions={actions} />

        {open && products && <Products products={products} header={false} />}
      </div>
    </div>
  );
};
