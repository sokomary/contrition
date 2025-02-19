import React, { Suspense, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isAdmin, Recipe } from 'src/types/domain';
import { getRecipes } from 'src/api';
import { Loading } from 'src/components/features';
import {
  useAuthenticate,
  useDeviceScreen,
  useLocation,
  useNavigate,
  useRoutModal,
} from 'src/hooks';
import { RecipeInfo } from 'src/components/modals';
import { ActionBar } from './components/ActionBar';
import { RecipesInfo } from './components/RecipesInfo';
import { RecipeCard } from './components/RecipeCard';
import * as css from './MainPage.css';

export const MainPage = () => {
  const { isOpen: isMenuOpen } = useRoutModal({ key: 'menu' });

  const user = useAuthenticate();
  const screen = useDeviceScreen();

  const [infoOpen, setInfoOpen] = useState(screen === 'mac');
  const [recipeToView, setRecipeToView] = useState<Recipe | undefined>(
    undefined
  );

  const [recipeInfoOpen, setRecipeInfoOpen] = useState(false);
  const [tagsToFilter, setTagsToFilter] = useState<number[]>([]);
  const [q, setQ] = useState('');

  const { data: recipes, isLoading } = useQuery({
    queryKey: ['recipes', tagsToFilter],
    queryFn: () => getRecipes(tagsToFilter),
  });
  const filteredRecipes = useMemo(
    () =>
      q?.length
        ? recipes?.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()))
        : recipes,
    [q, recipes]
  );

  const { search } = useLocation();
  const { navigate } = useNavigate();
  const showTooltip = !!search.select;

  return (
    <div className={css.pagewrap({ withSide: isMenuOpen })}>
      {recipeInfoOpen && recipeToView && (
        <RecipeInfo
          key={recipeToView.id}
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
          infoOpen={infoOpen}
          setInfoOpen={setInfoOpen}
          onQueryChange={setQ}
          onTagChange={(selectedTag) =>
            setTagsToFilter(selectedTag ? [selectedTag.id] : [])
          }
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
            />
          </Suspense>
        )}
        <div className={css.page}>
          {!isLoading ? (
            <>
              {recipes?.length ? (
                <div className={css.cards}>
                  {filteredRecipes?.map((r: Recipe, i: number) => (
                    <RecipeCard
                      onAddToMenu={() =>
                        navigate({
                          search: {
                            ...search,
                            select: [...search.select, r.id],
                          },
                        })
                      }
                      showTooltip={showTooltip}
                      onRecipeInfoOpenChange={setRecipeInfoOpen}
                      onViewClick={() => {
                        setRecipeToView(r);
                        setRecipeInfoOpen(true);
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
              ) : (
                <div className={css.noRecipes}>Пока нет рецептов</div>
              )}
            </>
          ) : (
            <div className={css.progressLoading}>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
