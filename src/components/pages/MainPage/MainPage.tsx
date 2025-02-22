import React from 'react';
import { Loading } from 'src/components/features';
import { ActionBar } from './components/ActionBar';
import { useLogic } from './MainPage.useLogic';
import * as css from './MainPage.css';
import { Content } from './components/Content';

export const MainPage = () => {
  const {
    filteredRecipes,
    isMenuOpen,
    isLoading,
    query,
    setQuery,
    tags,
    setTags,
  } = useLogic();

  return (
    <div className={css.container({ withSide: isMenuOpen })}>
      <ActionBar
        query={query}
        onQueryChange={setQuery}
        selectedTags={tags || []}
        onTagSelect={setTags}
      />

      {isLoading ? <Loading /> : <Content recipes={filteredRecipes} />}
    </div>
  );
};
