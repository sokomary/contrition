import React from 'react';
import { Temporal } from 'temporal-polyfill';
import { Menu, Kind } from 'src/types/domain';
import { useQuery } from '@tanstack/react-query';
import { getMenuProducts } from 'src/api';
import { periodToDates } from 'src/helpers/dates';
import { Action, ActionBar, Loading } from 'src/components/features';
import { upperFirst } from 'lodash';
import * as css from './CurrentMenu.css';

type Props = {
  menu?: Menu;
  kinds: Kind[];
  actions: Action[];
};

export const CurrentMenu = ({ menu, kinds, actions }: Props) => {
  const toPlainDate = (date?: string) =>
    date ? Temporal.PlainDate.from(date) : null;

  const { data: products, isLoading } = useQuery({
    queryFn: () => getMenuProducts(menu?.id as number),
    queryKey: ['menu-products'],
    enabled: !!menu,
  });

  const dates = periodToDates({
    start: toPlainDate(menu?.dateStart),
    end: toPlainDate(menu?.dateEnd),
  });

  return (
    <div className={css.container}>
      <div className={css.header}>
        {menu && (
          <div className={css.title}>
            {menu.dateStart} - {menu.dateEnd}
          </div>
        )}
        <ActionBar className={css.actions} actions={actions} />
      </div>

      {menu && (
        <>
          <div className={css.table}>
            <div className={css.content}>
              <div className={css.dateLabel} />
              {kinds?.map((kind, i) => (
                <div key={i} className={css.kindLabel}>
                  {upperFirst(kind.name)}
                </div>
              ))}
            </div>

            {dates?.map((date) => (
              <div key={date.toString()} className={css.content}>
                <div className={css.dateLabel}>{date.toString()}</div>
                {menu.meals
                  ?.filter((meal) => meal.date === date.toString())
                  .map((meal) => (
                    <div className={css.recipe} key={meal.id}>
                      {meal.recipe.name}
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {isLoading && <Loading />}
          {products && (
            <div className={css.products}>
              <div className={css.title}>Список продуктов:</div>
              {products
                .sort((a, b) => (b.quantity < a.quantity ? -1 : 1))
                .map((product) => (
                  <div key={product.id}>
                    {product.product.name} - {product.quantity}
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
