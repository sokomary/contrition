import React from 'react';
import * as css from './Value.css';

type Props = {
  label: string;
  content: React.ReactNode;
};

export const Value = ({ label, content }: Props) => (
  <div className={css.container}>
    <div>{label}</div>
    <div>{content}</div>
  </div>
);
