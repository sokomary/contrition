import React from 'react';
import { ActionBar, Button, PeriodPicker } from 'src/components/features';
import { upperFirst } from 'lodash';
import { format } from 'src/helpers/dates';
import { Kind } from 'src/types/domain';
import { useLogic, Options } from './useLogic';
import * as css from './index.css';

export const NewMenu = (props: Options) => {
  const {
    dates,
    findMeal,
    kinds,
    period,
    setPeriod,
    actions,
    selecting,
    onSelect,
    onCancel,
    onRemove,
    isSelected,
  } = useLogic(props);

  const renderItem = (date: string, kind: Kind) => {
    const recipe = findMeal(date.toString(), kind.id)?.recipe;

    if (recipe) {
      return (
        <div className={css.meal}>
          {findMeal(date.toString(), kind.id)?.recipe?.name}
          <Button
            kind="ghost"
            size="small"
            label="Удалить"
            onClick={() => onRemove(date, kind.id)}
          />
        </div>
      );
    }

    if (isSelected(date, kind)) {
      return <Button kind="ghost" label="Отмена" onClick={() => onCancel()} />;
    }

    return (
      <Button
        kind="ghost"
        label="Выбрать"
        disabled={!!selecting}
        onClick={() => onSelect(date.toString(), kind.id)}
      />
    );
  };

  return (
    <>
      <PeriodPicker value={period} onChange={setPeriod} />

      {period.start && period.end && (
        <div className={css.container}>
          <div className={css.row}>
            <div className={css.dateLabel} />
            {kinds.map((kind) => (
              <div key={kind.id} className={css.kindLabel}>
                {upperFirst(kind.name)}
              </div>
            ))}
          </div>

          {dates?.map((date, i) => (
            <div key={i} className={css.row}>
              <div className={css.dateLabel}>
                {format(date, { year: false })}
              </div>

              {kinds?.map((kind) => (
                <div key={kind.id}>
                  <div
                    className={css.empty({
                      selected: isSelected(date, kind),
                    })}
                    key={`${date}${kind}`}
                  >
                    {renderItem(date, kind)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <ActionBar actions={actions} />
    </>
  );
};
