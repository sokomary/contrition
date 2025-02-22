import React from 'react';
import { ClearIcon } from 'src/assets';
import { Button } from 'src/components/features';
import * as css from './Search.css';

type Props = {
  value: string;
  onChange: (q: string) => void;
  className?: string;
};

export const Search = ({ value, onChange, className }: Props) => (
  <div className={`${className} ${css.container}`}>
    <input
      value={value}
      placeholder="Поиск"
      className={css.input}
      onChange={(e) => onChange(e.target.value)}
    />

    <Button kind="ghost" className={css.icon} onClick={() => onChange('')}>
      <ClearIcon />
    </Button>
  </div>
);
