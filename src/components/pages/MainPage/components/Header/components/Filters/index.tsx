import { DropDownIcon, DropUpIcon } from 'src/assets';
import React from 'react';
import { Tag } from 'src/types/domain';
import { Search } from './components/Search';
import { Tags } from './components/Tags';
import * as css from './index.css';

export type FiltersProps = {
  selectedTags: Tag[];
  onTagSelect: (tag: Tag) => void;
  query: string;
  onQueryChange: (newQuery: string) => void;
  infoOpen: boolean;
  toggleInfoOpen: () => void;
};

export const Filters = ({
  selectedTags,
  onTagSelect,
  query,
  onQueryChange,
  infoOpen,
  toggleInfoOpen,
}: FiltersProps) => {
  const Icon = infoOpen ? DropUpIcon : DropDownIcon;

  return (
    <div className={css.container}>
      <div className={css.action}>
        <Icon className={css.icon} onClick={toggleInfoOpen} />
      </div>
      <div className={css.content}>
        <Tags value={selectedTags} onChange={onTagSelect} />
        <Search value={query} onChange={onQueryChange} />
      </div>
    </div>
  );
};
