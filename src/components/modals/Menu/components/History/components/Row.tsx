import { Menu } from 'src/types/domain';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ActionBar } from 'src/components/features';
import { getMenuProducts } from 'src/api';
import { Products } from '../../CurrentMenu/components/Products';
import * as css from './Row.css';

export const Row = ({ menu }: { menu: Menu }) => {
  const dates = Array.from(
    new Set(menu.meals?.map((meal) => meal.date))
  ).sort();
  const { data: products } = useQuery({
    queryFn: () => getMenuProducts(menu?.id as number),
    queryKey: ['menu-products'],
    enabled: !!menu,
  });

  const [open, setOpen] = useState(false);
  return (
    <div className={css.container}>
      {dates.map((date) => (
        <div key={date} className={css.recipe}>
          {menu.meals
            ?.filter((meal) => meal.date === date)
            .map((meal) => meal.recipe.name)
            .join(', ')}
        </div>
      ))}

      <div>
        <ActionBar
          actions={[
            { label: 'Продукты', onClick: () => setOpen(!open), kind: 'ghost' },
          ]}
        />
        {open && products && <Products products={products} header={false} />}
      </div>
    </div>
  );
};
