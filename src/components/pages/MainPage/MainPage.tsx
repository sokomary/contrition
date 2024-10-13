import React, {
  Suspense, useMemo, useState,
} from 'react';
import { useQuery } from 'react-query';
import { isAdmin, Recipe } from 'src/domain';
import { getRecipes } from 'src/api';
import { Loading } from 'src/components/features';
import { useAuthenticate, useDeviceScreen } from 'src/hooks';
import { RecipeForm, RecipeInfo } from 'src/components/modals';
import { ActionBar } from './components/ActionBar';
import { RecipesInfo } from './components/RecipesInfo';
import { RecipeCard } from './components/RecipeCard';
import * as css from './MainPage.css';

export const MainPage = () => {
  const user = useAuthenticate();
  const screen = useDeviceScreen();

  const [infoOpen, setInfoOpen] = useState(screen === 'mac');
  const [recipeToView, setRecipeToView] = useState<Recipe | undefined>(undefined);
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);

  const [recipeInfoOpen, setRecipeInfoOpen] = useState(false);
  const [tagsToFilter, setTagsToFilter] = useState<number[]>([]);
  const [recipeToEdit, setRecipeToEdit] = useState<Recipe | undefined>(undefined);
  const [q, setQ] = useState('');

  const { data: recipes, isLoading } = useQuery(
    ['recipes', tagsToFilter],
    () => getRecipes(tagsToFilter),
    { keepPreviousData: true, suspense: true },
  );
  const filteredRecipes = useMemo(() => (
    q?.length ? recipes?.filter((r) => r.name.toLowerCase().includes(q.toLowerCase())) : recipes
  ), [q, recipes]);

  return (
    <div className={css.page}>
      <RecipeForm
        key={recipeToEdit?.id || 0}
        open={recipeDialogOpen}
        defaultValues={recipeToEdit}
        onClose={() => {
          setRecipeDialogOpen(false);
          setRecipeToEdit(undefined);
        }}
      />

      {recipeInfoOpen && recipeToView && (
        <RecipeInfo
          onEditClick={() => {
            setRecipeInfoOpen(false);
            setRecipeToEdit(recipeToView);
            setRecipeDialogOpen(true);
          }}
          recipe={recipeToView}
          open={recipeInfoOpen}
          onClose={() => {
            setRecipeInfoOpen(false);
            setRecipeToView(undefined);
          }}
        />
      )}

      <div>
        <ActionBar
          onNewClick={() => setRecipeDialogOpen(true)}
          infoOpen={infoOpen}
          setInfoOpen={setInfoOpen}
          onQueryChange={setQ}
          onTagChange={(selectedTag) => setTagsToFilter(selectedTag ? [selectedTag.id] : [])}
        />
        {isAdmin(user) && recipes && (
          <Suspense>
            <RecipesInfo
              open={infoOpen}
              onViewClick={(r) => {
                setRecipeToView(r);
                setRecipeInfoOpen(true);
              }}
              onRecipeInfoOpenChange={setRecipeInfoOpen}
              recipes={recipes}
              onRecipeClick={(recipe) => {
                setRecipeToEdit(recipe);
                setRecipeDialogOpen(true);
              }}
            />
          </Suspense>
        )}
        <div className={css.page}>
          {!isLoading
            ? (
              <>
                {recipes?.length ? (
                  <div className={css.cards}>
                    {filteredRecipes?.map((r: Recipe, i: number) => (
                      <RecipeCard
                        onRecipeInfoOpenChange={setRecipeInfoOpen}
                        onViewClick={() => {
                          setRecipeToView(r);
                          setRecipeInfoOpen(true);
                        }}
                        onEditClick={() => {
                          setRecipeToEdit(r);
                          setRecipeDialogOpen(true);
                        }}
                        key={i}
                        recipe={r}
                      />
                    ))}
                    <div className={css.fakeCard} />
                    <div className={css.fakeCard} />
                    <div className={css.fakeCard} />
                    <div className={css.fakeCard} />
                    <div className={css.fakeCard} />
                  </div>
                ) : <div className={css.noRecipes}>Пока нет рецептов</div>}
              </>
            )
            : <div className={css.progressLoading}><Loading /></div>}
        </div>
      </div>
    </div>
  );
};
