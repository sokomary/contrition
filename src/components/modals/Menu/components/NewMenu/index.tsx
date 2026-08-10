import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActionBar, Button, PeriodPicker } from 'src/components/features';
import { upperFirst } from 'lodash';
import { Kind } from 'src/types/domain';
import { useLogic, Options } from './useLogic';
import { useFormat } from 'src/utils';
import { SelectRecipeModal } from './SelectRecipeModal';
import * as css from './index.css';

export const NewMenu = (props: Options) => {
  const { t } = useTranslation();
  const {
    dates,
    findMeal,
    kinds,
    period,
    setPeriod,
    actions,
    onRemove,
    selectRecipe,
    modalData,
    setModalData,
  } = useLogic(props);

  const renderItem = (date: string, kind: Kind) => {
    const recipe = findMeal(date.toString(), kind.id)?.recipeName;

    if (recipe) {
      return (
        <div className={css.meal}>
          {recipe}
          <Button
            kind='ghost'
            size='small'
            label={t('startpage.recipes.actions.delete')}
            onClick={() => onRemove(date, kind.id)}
          />
        </div>
      );
    }

    return (
      <Button
        kind='ghost'
        label={t('voc.select')}
        onClick={() => {
          setModalData({ date, kindId: kind.id });
        }}
      />
    );
  };

  const format = useFormat();

  return (
    <>
      <PeriodPicker value={period} onChange={setPeriod} />

      {period.start && period.end && (
        <div className={css.container} role='table'>
          <div className={css.row} role='row'>
            <div className={css.dateLabel} role='columnheader' />
            {kinds.map((kind) => (
              <div key={kind.id} className={css.kindLabel} role='columnheader'>
                {upperFirst(kind.name)}
              </div>
            ))}
          </div>

          {dates?.map((date) => (
            <div key={date} className={css.row} role='row'>
              <div className={css.dateLabel} role='rowheader'>
                {format({
                  kind: 'date',
                  value: date,
                  year: false,
                  template: 'numeric',
                })}
              </div>

              {kinds?.map((kind) => (
                <div key={`${date}${kind.id}`} role='cell'>
                  <div className={css.empty}>{renderItem(date, kind)}</div>
                </div>
              ))}
            </div>
          ))}

          {!!modalData && (
            <SelectRecipeModal
              isActive={!!modalData}
              onClose={() => setModalData(null)}
              onSelect={(id, name) => {
                selectRecipe(modalData?.date, id, modalData.kindId, name);
                setModalData(null);
              }}
            />
          )}
        </div>
      )}
      <ActionBar actions={actions} />
    </>
  );
};
