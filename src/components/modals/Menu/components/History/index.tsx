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
      {!menu.length && <div>{t('startpage.menu.history.empty')}</div>}

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
