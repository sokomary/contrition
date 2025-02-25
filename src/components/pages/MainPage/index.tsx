import React from 'react';
import { Loading } from 'src/components/features';
import { Header } from './components/Header';
import { useLogic } from './useLogic';
import { Content } from './components/Content';
import * as css from './index.css';

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
      <Header
        query={query}
        onQueryChange={setQuery}
        selectedTags={tags || []}
        onTagSelect={setTags}
      />

      {isLoading ? <Loading /> : <Content recipes={filteredRecipes} />}
    </div>
  );
};
