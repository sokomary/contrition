import React from 'react';
import { Action, ActionBar, Loading } from 'src/components/features';
import { Kind } from 'src/types/domain';
import { format } from 'src/helpers/dates';
import { useLogic, Options } from './CurrentMenu.useLogic';
import { Products } from './components/Products';
import { Table } from './components/Table';
import * as css from './CurrentMenu.css';

type Props = Options & {
  kinds: Kind[];
  actions: Action[];
};

export const CurrentMenu = ({ kinds, menu, actions }: Props) => {
  const { tableData, dates, period, isLoading, products } = useLogic({
    menu,
  });

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.title}>{format(period)}</div>
        <ActionBar className={css.actions} actions={actions} />
      </div>

      {menu && (
        <>
          {dates && <Table kinds={kinds} dates={dates} data={tableData} />}

          {isLoading && <Loading />}

          {products && <Products products={products} />}
        </>
      )}
    </div>
  );
};
