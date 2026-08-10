import React from 'react';
import * as css from './Value.css';

type Props = {
  label: string;
  content: React.ReactNode;
};

export const Value = ({ label, content }: Props) => (
  <div className={css.container}>
    <dt>{label}</dt>
    <dd>{content}</dd>
  </div>
);
