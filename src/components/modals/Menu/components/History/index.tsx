import React from 'react';
import { Menu } from 'src/types/domain';
import { Row } from './components/Row';
import { useFormat } from 'src/utils';
import * as css from './index.css';

type Props = {
  menu: Menu[];
};

export const History = ({ menu }: Props) => {
  const format = useFormat();

  return (
    <div className={css.container}>
      {!menu.length && <div>В истории пока пусто</div>}

      {menu.map((m, i) => (
        <div key={i} className={css.content}>
          <div className={css.header}>
            {format({
              kind: 'period',
              value: { from: m.dateStart, till: m.dateEnd },
            })}
          </div>

          <Row menu={m} />
        </div>
      ))}
    </div>
  );
};
