import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API } from '../../api';
import { AddRecipeDialog } from './dialogs/AddRecipeDialog';
import { Recipe } from '../../domain/Recipe';
import { Container } from '../ui/Container';

import { ReactComponent as AddSvg } from '../../assets/icons/add_icon.svg';
import { ReactComponent as RandomSvg } from '../../assets/icons/random_icon.svg';
import { Menu } from './Menu';
import { GetRandomRecipe } from './dialogs/GetRandomRecipe';
import { Tag } from '../../domain/Tag';
import { RecipeCard } from './RecipeCard';

const StartPage = () => {
  const [open, setOpen] = useState(false);
  const [randomDialogOpen, setRandomDialogOpen] = useState(false);

  const [tags, setTags] = useState<Tag[]>([]);
  const getTags = () => {
    API.getTags().then((res) => setTags(res));
  };
  useEffect(() => {
    getTags();
  }, []);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const getRecipes = (tagsToFilter?: string[]) => {
    API.getRecipes(tagsToFilter).then((res) => setRecipes(res));
  };
  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <Page>
      <AddRecipeDialog
        open={open}
        onClose={() => {
          setOpen(false);
          getRecipes();
        }}
      />
      <GetRandomRecipe
        tags={tags}
        open={randomDialogOpen}
        onClose={() => {
          setRandomDialogOpen(false);
        }}
      />

      <Container>
        <ActionBar vertical gap={50}>
          <AddIcon onClick={() => setOpen(true)} />
          <RandomIcon onClick={() => setRandomDialogOpen(true)} />
        </ActionBar>
        <Content>
          <Cards>{recipes.map((r, i) => <RecipeCard key={i} recipe={r} onDelete={getRecipes} />)}</Cards>
          <Menu tags={tags} onChange={(selectedTag) => getRecipes(selectedTag ? [selectedTag.name] : undefined)} />
        </Content>
      </Container>
    </Page>
  );
};

const Page = styled.div`
  height: 100vh;
  padding: 100px 0;
`;

const Content = styled.div`
  width: 90%;
  padding-right: 10%;
`;

const ActionBar = styled(Container)`
  justify-content: flex-start;
  width: 10%; 
  margin-left: 12px;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(4,  272px);
  gap: 30px;
  justify-content: space-between;
  
  padding: 0 12px;
  
  overflow-y: scroll;
  max-height: calc(100vh - 100px);
`;

const AddIcon = styled(AddSvg)`
  cursor: pointer;
  align-self: center;
`;

const RandomIcon = styled(RandomSvg)`
  cursor: pointer;
  align-self: center;
`;

export { StartPage };
