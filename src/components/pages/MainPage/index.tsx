import React from 'react';
import { Loading } from 'src/components/features';
import { Header } from './components/Header';
import { useLogic } from './useLogic';
import { Content } from './components/Content';
import * as css from './index.css';

export const MainPage = () => {
  const {
    recipes,
    sharedRecipes,
    isLoading,
    isSharedLoading,
    query,
    setQuery,
    tags,
    setTags,
    recipesObserver,
    sharedRecipesObserver,
  } = useLogic();

  const renderContent = () => {
    if (isLoading) {
      return <Loading />;
    }

    return (
      <>
        <Content recipes={recipes} />
        <div>{recipesObserver}</div>
      </>
    );
  };

  const renderSharedContent = () => {
    if (isSharedLoading) {
      return <Loading />;
    }

    if (!sharedRecipes.length) return null;

    return (
      <>
        <div className={css.title}>Shared with me</div>
        <Content recipes={sharedRecipes} />
        <div>{sharedRecipesObserver}</div>
      </>
    );
  };

  return (
    <div className={css.container}>
      <Header
        query={query}
        onQueryChange={setQuery}
        selectedTags={tags || []}
        onTagSelect={setTags}
      />

      {renderContent()}
      {renderSharedContent()}
    </div>
  );
};
