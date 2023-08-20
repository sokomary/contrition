import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { API } from '../../api';
import { AddRecipeDialog } from './AddRecipeDialog';
import { Recipe } from '../../domain/Recipe';
import i18next from '../../i18next';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { ReactComponent as LinkSvg } from '../../icons/link.svg';
import { Tag } from '../../domain/Tag';

const StartPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [randomRecipe, setRandomRecipe] = useState<Recipe | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const getTags = () => {
    API.getTags().then((res) => setTags(res));
  };
  useEffect(() => {
    getTags();
  }, []);

  const getRecipes = () => {
    API.getRecipes().then((res) => setRecipes(res));
  };

  const getRandomRecipe = () => {
    API.getRandomRecipe(selectedTags.map((t) => t.name)).then((res) => setRandomRecipe(res));
  };

  const deleteRecipe = (recipe: Recipe) => {
    API.deleteRecipe(recipe).then(getRecipes);
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

      {randomRecipe && (
        <div style={{ color: 'red' }}>{randomRecipe.name}</div>
      )}

      <Container vertical gap={50}>
        <Container style={{ justifyContent: 'flex-end' }}>
          <Button onClick={() => setOpen(true)}>
            {i18next.t('startpage:recipes.actions.add')}
          </Button>
          <Container vertical gap={20}>
            <Button onClick={getRandomRecipe}>
              {i18next.t('startpage:recipes.actions.random')}
            </Button>
            {tags.map((t) => (
              <TagName
                bold={selectedTags.includes(t)}
                key={t.id}
                onClick={() => (selectedTags.includes(t)
                  ? setSelectedTags([...selectedTags.filter((tag) => tag.id !== t.id)])
                  : setSelectedTags([...selectedTags, t]))}
              >
                {t.name}
              </TagName>
            ))}
          </Container>
        </Container>

        <StyledContainer gap={42}>
          {recipes.map((r, i) => (
            <Card key={i}>
              <Container vertical gap={10}>
                <Header gap={5}>
                  {r.name}
                  <Link style={{ height: 16, alignSelf: 'center' }} to={r.link}><LinkIcon /></Link>
                </Header>
                {r.tags.map((t) => (<>{t.name}</>))}
                <Container gap={5}>
                  <Element bold>{r.calories.toFixed(2)}</Element>
                  <Element>{r.protein.toFixed(2)}</Element>
                  <Element>{r.fats.toFixed(2)}</Element>
                  <Element>{r.carbohydrates.toFixed(2)}</Element>
                </Container>
                <Img src={r.img} />
              </Container>
              <Container style={{ justifyContent: 'flex-end' }}>
                <Button onClick={() => deleteRecipe(r)}>{i18next.t('startpage:recipes.actions.delete')}</Button>
              </Container>
            </Card>
          ))}
        </StyledContainer>
      </Container>
    </Page>
  );
};

const Page = styled.div`
  height: 100vh;
  padding: 30px;
`;

const StyledContainer = styled(Container)`
  flex-wrap: wrap;
`;

const Card = styled.div`
  padding: 20px;
  width: 300px;
  height: 415px;
  border-radius: 20px;
  background-color: pink;
  
  color: white;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled(Container)`
  font-size: 20px;
  font-weight: bold;
`;

const LinkIcon = styled(LinkSvg)`
  height: 16px;
  width: 16px;
  margin-bottom: 1px;
`;

const Element = styled.div<{ bold?: boolean }>`
  background-color: white;
  border-radius: 5px;
  height: 22px;
  padding: 2px 5px;

  color: #a4003f;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};

`;

const Img = styled.div<{ src: string }>`
  width: 260px;
  height: 260px;
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 15px;
`;

const TagName = styled.div<{ bold: boolean }>`
  color: pink;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  cursor: pointer;
`;

export { StartPage };
