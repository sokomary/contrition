import React from 'react';
import { Menu } from 'src/types/domain';
import { format } from 'src/helpers/dates';
import { Row } from './components/Row';
import * as css from './index.css';

type Props = {
  menu: Menu[];
};

export const History = ({ menu }: Props) => (
  <div className={css.container}>
    {!menu.length && <div>В истории пока пусто</div>}

    {menu.map((m, i) => (
      <div key={i} className={css.content}>
        <div className={css.header}>
          {format({ start: m.dateStart, end: m.dateEnd })}
        </div>

        <Row meals={m.meals || []} />
      </div>
    ))}
  </div>
);
