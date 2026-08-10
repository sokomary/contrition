import React from 'react';
import { useTranslation } from 'react-i18next';
import { Action, ActionBar, Loading } from 'src/components/features';
import { Kind } from 'src/types/domain';
import { useLogic, Options } from './useLogic';
import { Products } from './components/Products';
import { Table } from './components/Table';
import { useFormat } from 'src/utils';
import * as css from './index.css';

type Props = Options & {
  kinds: Kind[];
  actions: Action[];
};

export const CurrentMenu = ({ kinds, menu, actions }: Props) => {
  const { t } = useTranslation();
  const { tableData, dates, period, isLoading, products } = useLogic({
    menu,
  });

  const format = useFormat();

  const renderTitle = () => {
    if (!menu) {
      return t('startpage.menu.current.empty');
    }
    return (
      <h3 className={css.title}>
        {format({
          kind: 'period',
          value: {
            from: period.start?.toString(),
            till: period.end?.toString(),
          },
        })}
      </h3>
    );
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        {renderTitle()}
        <ActionBar actions={actions} />
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
