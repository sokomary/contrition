import React from 'react';
import * as css from './Loading.css';

type Props = {
  className?: string;
};
export const Loading = ({ className }: Props) => (
  <div className={`${css.container} ${className}`}>
    <div className={css.spinner} />
  </div>
);
