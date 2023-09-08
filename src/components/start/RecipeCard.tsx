import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../ui/Container';
import { Recipe } from '../../domain/Recipe';
import { API } from '../../api';
import { ReactComponent as LinkSvg } from '../../assets/icons/link.svg';
import { ReactComponent as DeleteSvg } from '../../assets/icons/delete_icon.svg';

const RecipeCard: FC<{ recipe: Recipe; onDelete: () => void }> = ({ recipe, onDelete }) => {
  const deleteRecipe = (deletingRecipe: Recipe) => {
    API.deleteRecipe(deletingRecipe).then(() => onDelete());
  };

  return (
    <Card>
      <Container vertical gap={12}>
        <Header>
          {recipe.name}
          <Link style={{ height: 16, alignSelf: 'flex-start', marginTop: '3px' }} to={recipe.link}>
            <LinkIcon />
          </Link>
        </Header>
        <Img src={recipe.img} />
        <Container gap={5}>
          <Element bold>{recipe.calories.toFixed(2)}</Element>
          <Element>{recipe.protein.toFixed(2)}</Element>
          <Element>{recipe.fats.toFixed(2)}</Element>
          <Element>{recipe.carbohydrates.toFixed(2)}</Element>
        </Container>
      </Container>
      <Container>
        <TagNames>{recipe.tags.map((t) => (t.name)).join(', ') || <div />}</TagNames>
        <DeleteIcon onClick={() => deleteRecipe(recipe)} />
      </Container>
    </Card>
  );
};

const Card = styled.div`
  padding: 20px 25px;
  width: 272px;
  height: 372px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.87);
  
  color: #113C0F;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled(Container)`
  font-size: 18px;
  font-weight: bold;
`;

const LinkIcon = styled(LinkSvg)`
  height: 16px;
  width: 16px;
  margin-bottom: 1px;
`;

const Element = styled.div<{ bold?: boolean }>`
  background-color: rgba(241, 207, 211, 0.48);
  border-radius: 7px;
  height: 25px;
  padding: 4px 7px;

  border: solid white 0.5px;
  
  color: #E1737F;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
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
  color: #113C0F;
  align-self: center;
`;

const DeleteIcon = styled(DeleteSvg)`
  cursor: pointer;
  align-self: flex-end;
`;

export { RecipeCard };
