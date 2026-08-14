import { IconDropDown, IconDropUp } from 'src/assets';
import React from 'react';
import { Tag } from 'src/types/domain';
import { Search } from './components/Search';
import { Tags } from './components/Tags';
import { Button } from 'src/components/features';
import * as css from './index.css';

export type FiltersProps = {
  selectedTags: Tag[];
  onTagSelect: (tag: Tag) => void;
  query: string;
  onQueryChange: (newQuery: string) => void;
  infoOpen: boolean;
  toggleInfoOpen?: () => void;
  className?: string;
};

export const Filters = ({
  selectedTags,
  onTagSelect,
  query,
  onQueryChange,
  infoOpen,
  toggleInfoOpen,
  className,
}: FiltersProps) => {
  const Icon = infoOpen ? IconDropUp : IconDropDown;

  return (
    <div className={`${css.container} ${className}`}>
      {toggleInfoOpen && (
        <Button
          startGraphic={<Icon />}
          onClick={toggleInfoOpen}
          className={css.action}
        />
      )}
      <div className={css.content}>
        <Tags value={selectedTags} onChange={onTagSelect} />
        <Search value={query} onChange={onQueryChange} />
      </div>
    </div>
  );
};
