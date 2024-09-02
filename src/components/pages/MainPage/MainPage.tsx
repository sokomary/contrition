import React, {
  Suspense, useMemo, useState,
} from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from 'react-query';
import { isAdmin, Recipe } from 'src/domain';
import { getRecipes } from 'src/api';
import { Container, Loading } from 'src/components/features';
import { useAuthenticate, useDeviceScreen } from 'src/hooks';
import { AddRecipe, RecipeInfo } from 'src/components/dialogs';
import { ActionBar } from './components/ActionBar';
import { RecipesInfo } from './components/RecipesInfo';
import { RecipeCard } from './components/RecipeCard';

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
    <Page recipeInfoOpen={recipeInfoOpen}>
      <AddRecipe
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
          inline={['mac', 'ipadh'].includes(screen)}
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

      <Container vertical gap={0}>
        <ActionBar
          recipeInfoOpen={recipeInfoOpen}
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
              recipeInfoOpen={recipeInfoOpen}
              onRecipeInfoOpenChange={setRecipeInfoOpen}
              recipes={recipes}
              onRecipeClick={(recipe) => {
                setRecipeToEdit(recipe);
                setRecipeDialogOpen(true);
              }}
            />
          </Suspense>
        )}
        <Content>
          {!isLoading
            ? (
              <>
                {recipes?.length ? (
                  <Cards>
                    {filteredRecipes?.map((r: Recipe, i: number) => (
                      <RecipeCard
                        infoOpen={recipeInfoOpen}
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
                    <FakeCard />
                    <FakeCard />
                    <FakeCard />
                    <FakeCard />
                    <FakeCard />
                  </Cards>
                ) : <NoRecipes>Пока нет рецептов</NoRecipes>}
              </>
            )
            : <ProgressLoading><Loading /></ProgressLoading>}
        </Content>
      </Container>
    </Page>
  );
};

const Page = styled.div<{ recipeInfoOpen: boolean }>`
  height: 100vh;
  ${({ recipeInfoOpen, theme }) => {
    if (recipeInfoOpen && theme.screen === 'mac') {
      return 'width: calc(100vw - 517px);';
    }
    if (recipeInfoOpen && theme.screen === 'ipadh') {
      return 'width: calc(100vw - 367px);';
    }
    return 'width: 100%vw';
  }}
`;

const Content = styled.div`
  position: relative;
`;

const Cards = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  row-gap: 40px;
  padding: 20px 40px 0 40px;
  ${({ theme }) => ['ipadv', 'ipadh'].includes(theme.screen) && css`
    padding: 20px 20px 0 20px;
    row-gap: 20px;
  `};
  ${({ theme }) => theme.screen === 'iphone' && css`
    padding: 15px 15px 0 15px;
    row-gap: 20px;
  `};
`;

const ProgressLoading = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoRecipes = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.screen === 'mac' && css`
    height: 100%;
  `};
`;

const FakeCard = styled.div`
  width: 268px;
  ${({ theme }) => theme.screen === 'ipadh' && css`
    width: 268px;
  `};
  ${({ theme }) => theme.screen === 'ipadv' && css`
    width: 242px;
  `};
  ${({ theme }) => theme.screen === 'iphone' && css`
    width: 170px;
  `};
`;
