import React, { Fragment, ReactNode } from 'react';
import { Action, ActionBar } from 'src/components/features';
import * as css from './Card.css';

type Props = {
  title: ReactNode;
  actions?: Action[];
  items: ReactNode[];
  className?: string;
  layout?: 'horizontal' | 'vertical';
};

export const Card = ({
  title,
  items,
  actions,
  className,
  layout = 'vertical',
}: Props) => (
  <div className={`${className}`}>
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.header}>
          <div className={css.title}>{title}</div>
          <div className={css.divider} />
          <div>{items.length}</div>
        </div>

        {actions && <ActionBar actions={actions} />}
      </div>

      <div className={css.list({ layout })}>
        {items.map((item, index) => (
          <Fragment key={index}>{item}</Fragment>
        ))}
      </div>
    </div>
  </div>
);
