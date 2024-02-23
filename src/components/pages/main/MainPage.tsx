import React, {
  Suspense, useMemo, useState,
} from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from 'react-query';
import { isAdmin, Recipe } from 'src/domain';
import { getRecipes, getTags } from 'src/api';
import { Container, Loading } from 'src/components/features';
import { useAuthenticate } from 'src/hooks';
import { AddRecipe } from 'src/components/dialogs';
import { ActionBar } from './components/actionBar/ActionBar';
import { RecipesInfo } from './components/RecipesInfo';
import { RecipeCard } from './components/RecipeCard';
// import { useDeviceScreen } from '../../../hooks/useDeviceScreen';

export const MainPage = () => {
  const user = useAuthenticate();

  // todo на телефоне false
  // const screen = useDeviceScreen();

  // const [infoOpen, setInfoOpen] = useState(screen === 'mac');
  const [infoOpen, setInfoOpen] = useState(true);
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [tagsToFilter, setTagsToFilter] = useState<number[]>([]);
  const [recipeToEdit, setRecipeToEdit] = useState<Recipe | undefined>(undefined);
  const [q, setQ] = useState('');

  const { data: tags, isLoading: isTagsLoading } = useQuery('tags', () => getTags());
  const { data: recipes, isLoading } = useQuery(
    ['recipes', tagsToFilter],
    () => getRecipes(tagsToFilter),
    { keepPreviousData: true, suspense: true },
  );
  const filteredRecipes = useMemo(() => (
    q?.length ? recipes?.filter((r) => r.name.toLowerCase().includes(q.toLowerCase())) : recipes
  ), [q, recipes]);

  return (
    <Page>
      {!isTagsLoading && recipeDialogOpen && !!tags?.length && (
        <Suspense>
          <AddRecipe
            key={recipeToEdit?.id || 0}
            tags={tags}
            open={recipeDialogOpen}
            defaultValues={recipeToEdit}
            onClose={() => {
              setRecipeDialogOpen(false);
              setRecipeToEdit(undefined);
            }}
          />
        </Suspense>
      )}

      <Container vertical gap={0}>
        <ActionBar
          onNewClick={() => setRecipeDialogOpen(true)}
          infoOpen={infoOpen}
          setInfoOpen={setInfoOpen}
          onQueryChange={setQ}
          onTagChange={(selectedTag) => setTagsToFilter(selectedTag ? [selectedTag.id] : [])}
        />
        {isAdmin(user) && recipes && infoOpen && (
          <RecipesInfo
            recipes={recipes}
            onRecipeClick={(recipe) => {
              setRecipeToEdit(recipe);
              setRecipeDialogOpen(true);
            }}
          />
        )}
        <Content>
          {!isLoading
            ? (
              <>
                {recipes?.length ? (
                  <Cards>
                    {filteredRecipes?.map((r: Recipe, i: number) => (
                      <RecipeCard
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

const Page = styled.div`
  height: 100vh;
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
  padding: 40px;

  ${({ theme }) => ['ipadv', 'ipadh'].includes(theme.screen) && css`
    padding: 20px;
    row-gap: 20px;
  `};

  ${({ theme }) => theme.screen === 'iphone' && css`
    padding: 15px;
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
