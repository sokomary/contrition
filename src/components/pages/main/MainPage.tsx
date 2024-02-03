import React, {
  Suspense, useMemo, useState,
} from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { isAdmin, Recipe } from 'src/domain';
import { getRecipes, getTags } from 'src/api';
import { Container, Loading } from 'src/components/features';
import { useAuthenticate } from 'src/hooks';
import { AddRecipe } from 'src/components/dialogs';
import { ActionBar } from './components/ActionBar';
import { RecipesInfo } from './components/RecipesInfo';
import { RecipeCard } from './components/RecipeCard';

export const MainPage = () => {
  const user = useAuthenticate();

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
          onQueryChange={setQ}
          onTagChange={(selectedTag) => setTagsToFilter(selectedTag ? [selectedTag.id] : [])}
        />
        {isAdmin(user) && recipes && (
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
                        onDialogOpen={(recipe) => {
                          setRecipeToEdit(recipe);
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
  row-gap: 20px;
  padding: 40px;
  @media (max-width: 600px) {
    justify-content: center;
  }
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
  @media (max-width: 890px) {
    height: 600px;
  }
  @media (min-width: 890px) {
    height: 100%;
  }
`;

const FakeCard = styled.div`
  width: 260px;
  @media (max-width: 600px) {
    display: none;
  }
`;
