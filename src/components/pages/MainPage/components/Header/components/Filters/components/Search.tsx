import React from 'react';
import { useTranslation } from 'react-i18next';
import { ClearIcon } from 'src/assets';
import { Button } from 'src/components/features';
import * as css from './Search.css';

type Props = {
  value: string;
  onChange: (q: string) => void;
  className?: string;
};

export const Search = ({ value, onChange, className }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={`${className} ${css.container}`}>
      <input
        value={value}
        placeholder={t('voc.search')}
        className={css.input}
        onChange={(e) => onChange(e.target.value)}
      />

      <Button
        startGraphic={<ClearIcon />}
        kind='ghost'
        className={css.icon}
        onClick={() => onChange('')}
      />
    </div>
  );
};
