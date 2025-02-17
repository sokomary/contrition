import { upperFirst } from 'lodash';
import { format } from 'src/helpers/dates';
import React from 'react';
import { Temporal } from 'temporal-polyfill';
import { Kind, Recipe } from 'src/types/domain';
import * as css from './Table.css';

type Props = {
  kinds: Kind[];
  dates: Temporal.PlainDate[];
  data: Record<string, Record<number, Recipe>>;
};

export const Table = ({ kinds, dates, data }: Props) => (
  <div className={css.container}>
    <div className={css.content}>
      <div className={css.dateLabel} />
      {kinds.map((kind, i) => (
        <div key={i} className={css.kindLabel}>
          {upperFirst(kind.name)}
        </div>
      ))}
    </div>

    {dates.map((date, dateIndex) => (
      <div key={date.toString()} className={css.content}>
        <div className={css.dateLabel}>{format(date, { year: false })}</div>
        {kinds.map((kind, kindIndex) => (
          <div className={css.recipe} key={`${kindIndex}${dateIndex}`}>
            {data[date.toString()][kind.id].name}
          </div>
        ))}
      </div>
    ))}
  </div>
);
