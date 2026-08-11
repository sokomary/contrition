import React, { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from 'src/components/features';
import { Header } from './components/Header';
import { useLogic } from './useLogic';
import { Content } from './components/Content';
import * as css from './index.css';

export const MainPage = () => {
  const { t } = useTranslation();
  const sharedTitleId = useId();
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
      <section aria-labelledby={sharedTitleId}>
        <h4 className={css.title} id={sharedTitleId}>
          {t('startpage.recipes.shared.title')}
        </h4>
        <Content recipes={sharedRecipes} />
        <div>{sharedRecipesObserver}</div>
      </section>
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

      <main>
        {renderContent()}
        {renderSharedContent()}
      </main>
    </div>
  );
};
