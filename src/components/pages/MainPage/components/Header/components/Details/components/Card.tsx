import React, { ReactNode, useId } from 'react';
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
}: Props) => {
  const titleId = useId();

  return (
    <section className={`${className}`} aria-labelledby={titleId}>
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.header}>
            <h5 className={css.title} id={titleId}>
              {title}
            </h5>
            <div className={css.divider} />
            <div>{items.length}</div>
          </div>

          {actions && <ActionBar actions={actions} />}
        </div>

        <ul className={css.list({ layout })}>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};
