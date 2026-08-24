import React from 'react';
import { useTranslation } from 'react-i18next';
import { Action, ActionBar, Dropdown, Loading } from 'src/components/features';
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
  const {
    tableData,
    dates,
    period,
    isLoading,
    products,
    excludeRecipes,
    setExcludeRecipes,
  } = useLogic({
    menu,
  });

  const format = useFormat();

  const renderTitle = () => {
    if (!menu) {
      return t('startpage.menu.current.empty');
    }
    return (
      <h6>
        {format({
          kind: 'period',
          value: {
            from: period.start?.toString(),
            till: period.end?.toString(),
          },
        })}
      </h6>
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
          {dates && (
            <Table kinds={kinds} dates={dates} data={tableData.table} />
          )}
          {isLoading && <Loading />}
          {products && (
            <div className={css.products}>
              <h6>{t('startpage.menu.products.title')}</h6>
              <div>
                <Dropdown
                  options={tableData.recipes.map((recipe) => ({
                    value: recipe,
                    label: recipe.name,
                  }))}
                  value={excludeRecipes}
                  onSelect={(recipe) => {
                    if (excludeRecipes.find((r) => r.id === recipe.id)) {
                      setExcludeRecipes((prev) =>
                        prev.filter((r) => r.id !== recipe.id),
                      );
                    } else {
                      setExcludeRecipes((prev) => [...prev, recipe]);
                    }
                  }}
                  label={t('startpage.menu.products.excludeRecipes')}
                />
              </div>
              <Products products={products} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
