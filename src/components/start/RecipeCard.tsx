import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../ui/Container';
import { Recipe } from '../../domain/Recipe';
import { API } from '../../api';
import { ReactComponent as LinkSvg } from '../../assets/icons/link.svg';
import { theme } from '../ui/theme';
import { RecipePage } from './dialogs/RecipePage';

const RecipeCard: FC<{
  recipe: Recipe; onDelete: () => void; onDialogOpen: (recipe: Recipe) => void;
}> = ({
  recipe, onDelete, onDialogOpen,
}) => {
  const [pageOpen, setPageOpen] = useState(false);
  const deleteRecipe = () => API.deleteRecipe(recipe).then(onDelete);

  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <Card>
      {pageOpen && (
        <RecipePage
          recipe={recipe}
          open={pageOpen}
          onClose={() => setPageOpen(false)}
        />
      )}
      <Container vertical gap={12}>
        <Header>
          <RecipeName onClick={() => setPageOpen(true)}>{recipe.name}</RecipeName>
          <Link style={{ height: 18, alignSelf: 'flex-start', marginTop: '3px' }} to={recipe.link}>
            <LinkIcon />
          </Link>
        </Header>
        {recipe.pressignedUrl && <StyledImg src={recipe.pressignedUrl} onClick={() => setPageOpen(true)} />}
        <Container gap={5}>
          <Element bold>
            {recipe.calories.toFixed(recipe.calories % 1 > 0 ? 2 : undefined)}
          </Element>
          <Element>{recipe.protein.toFixed(recipe.protein % 1 > 0 ? 2 : undefined)}</Element>
          <Element>{recipe.fats.toFixed(recipe.fats % 1 > 0 ? 2 : undefined)}</Element>
          <Element>{recipe.carbohydrates.toFixed(recipe.carbohydrates % 1 > 0 ? 2 : undefined)}</Element>
        </Container>
      </Container>
      <Container>
        <TagNames>
          {recipe.tags.map((t) => (
            <div key={t.id}>
              #
              {t.name}
            </div>
          ))}
        </TagNames>
        <Dots
          key={recipe.id}
          tabIndex={0}
          gap={2}
          onClick={() => setOptionsOpen(!optionsOpen)}
          onBlur={() => setOptionsOpen(false)}
        >
          <Dot />
          <Dot />
          <Dot />
          {optionsOpen && (
            <Options>
              <Option onClick={deleteRecipe}>Удалить</Option>
              <Option onClick={() => onDialogOpen(recipe)}>Изменить</Option>
            </Options>
          )}
        </Dots>
      </Container>
    </Card>
  );
};

const Card = styled.div`
  padding: 20px 25px;
  width: 272px;
  height: 372px;
  
  color: #113C0F;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex-shrink: 0;

  border-radius: 25px;
  background: #FFF;
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
`;

const Header = styled(Container)`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.color.font}
`;

const LinkIcon = styled(LinkSvg)`
  height: 16px;
  width: 16px;
  margin-bottom: 1px;
`;

const Element = styled.div<{ bold?: boolean }>`
  background-color: ${theme.color.secondary};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${theme.color.primary};

  border: solid white 0.5px;
  border-radius: 7px;
  
  height: 25px;
  padding: 4px 7px;
`;

const Img = styled.div<{ src: string }>`
  width: 220px;
  height: 220px;
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 15px;
`;

const TagNames = styled.div`
  color: ${theme.color.accent};
  align-self: center;
`;

const Dot = styled.div`
  height: 5px;
  width: 5px;
  border-radius: 2.5px;
  background-color: ${theme.color.primary};
`;

const Dots = styled(Container)`
  cursor: pointer;
  align-self: center;
  position: relative;
  height: 20px;
  
  display: flex;
  align-items: center;
`;

const Options = styled(Container)`
  position: absolute;
  border-radius: 5px;
  background: #FFF;
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
  padding: 8px;
  
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  right: 0;
  top: 14px;
`;

const Option = styled.div`
  width: 70px;
  height: 25px;
  display: flex;
  align-items: center;
  padding: 0 4px;
  &:hover {
    color: ${theme.color.primary}
  }
`;

const RecipeName = styled.div`
  cursor: pointer;
`;

const StyledImg = styled(Img)`
  cursor: pointer;
`;

export { RecipeCard };
