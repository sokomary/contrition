import { Button, Dialog } from 'src/components/features';
import React from 'react';
import { useLogic } from 'src/components/pages/MainPage/useLogic';
import { RecipeCard } from 'src/components/pages/MainPage/components/RecipeCard';
import { Filters } from 'src/components/pages/MainPage/components/Header/components/Filters';
import { useTranslation } from 'react-i18next';
import { useToggleModal } from '../../../useToggleModal';
import * as css from './SelectRecipeModal.css';

type Props = {
  isActive: boolean;
  onClose: () => void;
  onSelect: (id: number, name: string) => void;
};

export const SelectRecipeModal = ({ isActive, onClose, onSelect }: Props) => {
  const { t } = useTranslation();
  const {
    recipes,
    recipesObserver,
    sharedRecipes,
    sharedRecipesObserver,
    tags,
    setTags,
    query,
    setQuery,
  } = useLogic();

  const { open } = useToggleModal('recipe-new', 'true');

  return (
    <Dialog
      size='large'
      isActive={isActive}
      header={t('startpage.menu.selectRecipe.header')}
      onClose={onClose}
    >
      <div className={css.header}>
        <Button label={t('startpage.recipes.new.header')} onClick={open} />
        <Filters
          infoOpen={false}
          selectedTags={tags}
          onTagSelect={setTags}
          toggleInfoOpen={undefined}
          query={query}
          onQueryChange={setQuery}
          className={css.filters}
        />
      </div>

      <div className={css.container}>
        {[...recipes, ...sharedRecipes].map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            small={true}
            bottom={
              <div className={css.content}>
                <Button
                  label={t('startpage.menu.actions.addRecipe')}
                  onClick={() => onSelect(recipe.id, recipe.name)}
                />
              </div>
            }
          />
        ))}
        {recipesObserver}
        {sharedRecipesObserver}
      </div>
    </Dialog>
  );
};
