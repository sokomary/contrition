import React from 'react';
import * as css from './Loading.css';

export const Loading = () => (
  <div className={css.container}>
    <div className={css.spinner} />
  </div>
);
