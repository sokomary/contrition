import React, { useState } from 'react';
import { ClearIcon } from 'src/assets';
import { Button } from 'src/components/features';
import * as css from './Search.css';

type Props = {
  onQueryChange: (q: string) => void;
  className?: string;
};

export const Search = ({ onQueryChange, className }: Props) => {
  const [q, setQ] = useState('');
  return (
    <div className={`${className} ${css.container}`}>
      <input
        className={css.input}
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          onQueryChange(e.target.value);
        }}
        placeholder="Поиск"
      />
      <Button
        kind="ghost"
        className={css.icon}
        onClick={() => {
          setQ('');
          onQueryChange('');
        }}
      >
        <ClearIcon />
      </Button>
    </div>
  );
};
