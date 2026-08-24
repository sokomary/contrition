import { upperFirst } from 'lodash';
import React from 'react';
import { Temporal } from 'temporal-polyfill';
import { Kind, Recipe } from 'src/types/domain';
import { useFormat } from 'src/utils';
import { Button } from 'src/components/features';
import { useToggleModal } from '../../../../useToggleModal';
import * as css from './Table.css';

type Props = {
  kinds: Kind[];
  dates: Temporal.PlainDate[];
  data: Record<string, Record<number, Recipe>>;
};

export const Table = ({ kinds, dates, data }: Props) => {
  const format = useFormat();

  return (
    <div className={css.container} role='table'>
      <div className={css.content} role='row'>
        <div className={css.dateLabel} role='columnheader' />
        {kinds.map((kind, i) => (
          <div key={i} className={css.kindLabel} role='columnheader'>
            {upperFirst(kind.name)}
          </div>
        ))}
      </div>

      {dates.map((date, dateIndex) => (
        <div key={date.toString()} className={css.content} role='row'>
          <div className={css.dateLabel} role='rowheader'>
            {format({
              kind: 'date',
              value: date.toString(),
              template: 'numeric',
              year: false,
            })}
          </div>

          {kinds.map((kind, kindIndex) => (
            <Item
              key={`${kindIndex}${dateIndex}`}
              recipe={data[date.toString()][kind.id]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const Item = ({ recipe }: { recipe: Recipe }) => {
  const { open } = useToggleModal('recipe-info', recipe.id.toString());

  return (
    <Button className={css.recipe} role='cell' onClick={open}>
      {recipe.name}
    </Button>
  );
};
