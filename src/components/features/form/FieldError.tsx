import React from 'react';
import * as css from './FieldError.css';

type Props = {
  text: string;
};

export const FieldError = ({ text }: Props) => (
  <div className={css.text}>{text}</div>
);
