import React from 'react';
import * as css from './FieldError.css';

type Props = {
  text: string;
};

export const FieldError = ({ text }: Props) => (
  <p className={css.text} role='alert'>
    {text}
  </p>
);
