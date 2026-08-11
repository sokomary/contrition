import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'src/types/domain';
import { Row } from './components/Row';
import { useFormat } from 'src/utils';
import * as css from './index.css';

type Props = {
  menu: Menu[];
};

export const History = ({ menu }: Props) => {
  const { t } = useTranslation();
  const format = useFormat();

  return (
    <div className={css.container}>
      {!menu.length && <p>{t('startpage.menu.history.empty')}</p>}

      <ul className={css.list}>
        {menu.map((m, i) => (
          <li key={i} className={css.content}>
            <h6 className={css.header}>
              {format({
                kind: 'period',
                value: { from: m.dateStart, till: m.dateEnd },
              })}
            </h6>

            <Row menu={m} />
          </li>
        ))}
      </ul>
    </div>
  );
};
