import React from 'react';
import { ActionBar, Button, PeriodPicker } from 'src/components/features';
import { upperFirst } from 'lodash';
import { useLogic, Options } from './NewMenu.useLogic';
import * as css from './NewMenu.css';

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
  } = useLogic(props);

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
              <div className={css.dateLabel}>{date.toString()}</div>

              {kinds?.map((kind) => (
                <div key={kind.id}>
                  <div
                    className={css.empty({
                      selected:
                        selecting?.date === date.toString() &&
                        selecting?.kindId === kind.id,
                    })}
                    key={`${date}${kind}`}
                  >
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {!findMeal(date.toString(), kind.id)?.recipe ? (
                      !(
                        selecting?.date === date.toString() &&
                        selecting?.kindId === kind.id
                      ) ? (
                        <Button
                          kind="ghost"
                          label="Выбрать"
                          disabled={!!selecting}
                          onClick={() => onSelect(date.toString(), kind.id)}
                        />
                      ) : (
                        <Button
                          kind="ghost"
                          label="Отмена"
                          onClick={() => onCancel()}
                        />
                      )
                    ) : (
                      <div className={css.meal}>
                        {findMeal(date.toString(), kind.id)?.recipe?.name}
                        <Button
                          kind="ghost"
                          size="small"
                          label="Удалить"
                          onClick={() => onRemove(date, kind.id)}
                        />
                      </div>
                    )}
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
