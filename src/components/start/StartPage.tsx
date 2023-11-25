import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API } from '../../api';
import { RecipeDialog } from './dialogs/RecipeDialog';
import { Recipe } from '../../domain/Recipe';
import { Container } from '../ui/Container';
import { GetRandomRecipe } from './dialogs/GetRandomRecipe';
import { Tag } from '../../domain/Tag';
import { RecipeCard } from './RecipeCard';
import { Button } from '../ui/Button';
import { Menu } from './Menu';
import { MobileMenu } from './MobileMenu';
import { Loading } from '../ui/Loading';

const StartPage = () => {
  const [open, setOpen] = useState(false);
  const [randomDialogOpen, setRandomDialogOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState<Tag[]>([]);
  const getTags = () => API.getTags().then((res) => setTags(res));
  useEffect(() => {
    getTags();
  }, []);

  const [recipeToEdit, setRecipeToEdit] = useState<Recipe | undefined>(undefined);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const getRecipes = (tagsToFilter?: number[]) => {
    setLoading(true);
    API.getRecipes(tagsToFilter).then((res) => {
      setRecipes(res);
      setLoading(false);
    });
  };
  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <Page>
      {tags.length > 0 && (
        <RecipeDialog
          key={recipeToEdit?.id || 0}
          tags={tags}
          open={open}
          defaultValues={recipeToEdit}
          onClose={(res) => {
            setOpen(false);
            setRecipeToEdit(undefined);
            if (res) {
              getRecipes();
            }
          }}
        />
      )}
      {tags.length > 0 && randomDialogOpen && (
        <GetRandomRecipe
          tags={tags}
          open={randomDialogOpen}
          onClose={() => setRandomDialogOpen(false)}
        />
      )}

      <StyledContainer gap={1}>
        <ActionBar vertical gap={30}>
          <Button size="large" onClick={() => setOpen(true)}>Новый рецепт</Button>
          <Button size="large" styleType="primary" onClick={() => setRandomDialogOpen(true)}>Случайный рецепт</Button>
        </ActionBar>
        <MobileMenu
          tags={tags}
          onChange={(selectedTag) => getRecipes(selectedTag ? [selectedTag.id] : undefined)}
        />
        <Content>
          {!loading
            ? (
              <>
                {recipes.length > 0 ? (
                  <Cards>
                    {recipes.map((r, i) => (
                      <RecipeCard
                        key={i}
                        recipe={r}
                        onDelete={() => setRecipes(recipes.filter((dr) => dr.id !== r.id))}
                        onDialogOpen={(recipe) => {
                          API.getInstructions(recipe.id).then((instructions) => {
                            setRecipeToEdit({ ...recipe, instructions });
                            setOpen(true);
                          });
                        }}
                      />
                    ))}
                  </Cards>
                ) : <NoRecipes>Пока нет рецептов</NoRecipes>}
              </>
            )
            : <ProgressLoading><Loading /></ProgressLoading>}
          <Menu
            tags={tags}
            onChange={(selectedTag) => getRecipes(selectedTag ? [selectedTag.id] : undefined)}
          />
        </Content>
      </StyledContainer>
    </Page>
  );
};

const Page = styled.div`
  height: 100vh;
`;

const StyledContainer = styled(Container)`
  @media (max-width: 700px) {
    flex-direction: column;
    height: 100%;
  }
`;

const Content = styled.div`
  width: 73%;
  height: 100vh;
  position: relative;

  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
  }
`;

const ActionBar = styled(Container)`
  justify-content: flex-start;
  width: 12%; 
  margin-left: 40px;
  padding-top: 100px;

  @media (max-width: 700px) {
    flex-direction: row;
    width: 100%;
    padding-top: 40px;
    padding-left: 40px;
    padding-right: 40px;
    margin-left: 0;
    justify-content: space-around;
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(4,  272px);
  gap: 25px;
  justify-content: space-between;
  
  padding: 100px 40px 200px 40px;
  
  overflow-y: auto;
  max-height: 100vh;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 40px;
    height: 100%;
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

  @media (max-width: 700px) {
    height: 600px;
  }
  @media (min-width: 700px) {
    height: 100%;
  }
`;

export { StartPage };
