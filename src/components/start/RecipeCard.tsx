import React, { CSSProperties, FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { Container } from '../ui/Container';
import { Recipe } from '../../domain/Recipe';
import {
  deleteRecipe, fromFavorites, toFavorites,
} from '../../api/api';
import { ReactComponent as LinkSvg } from '../../assets/icons/link.svg';
import { ReactComponent as FavoriteSvg } from '../../assets/icons/favorite.svg';
import { ReactComponent as NonFavoriteSvg } from '../../assets/icons/non-favorite.svg';
import { theme } from '../ui/theme';
import { RecipePage } from './dialogs/RecipePage';

const VISIBLE_TAGS_COUNT = 2;
const RecipeCard: FC<{
  recipe: Recipe; style?: CSSProperties; onDialogOpen: (recipe: Recipe) => void; displayInfo?: boolean; }> = ({
  recipe, style, onDialogOpen, displayInfo,
}) => {
  const [pageOpen, setPageOpen] = useState(false);
  const visibleTags = recipe.tags.slice(0, VISIBLE_TAGS_COUNT);
  const restTagsCount = recipe.tags.length - 2;

  const queryClient = useQueryClient();
  const toFavoritesMutation = useMutation({
    mutationFn: toFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
  const fromFavoritesMutation = useMutation({
    mutationFn: fromFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
  const localDisplayInfo = displayInfo === undefined || displayInfo;

  return (
    <Card localDisplayInfo={localDisplayInfo} style={style}>
      {pageOpen && (
        <RecipePage
          recipe={recipe}
          open={pageOpen}
          onClose={() => setPageOpen(false)}
        />
      )}

      <Container vertical gap={10}>

        <Header>
          <Container style={{ alignItems: 'center' }} gap={3}>
            {recipe.favorite
              ? <FavoriteIcon onClick={() => fromFavoritesMutation.mutate(recipe.id)} />
              : <NonFavoriteIcon onClick={() => toFavoritesMutation.mutate(recipe.id)} />}
            <RecipeName onClick={() => setPageOpen(true)}>{recipe.name}</RecipeName>
          </Container>

          <Container gap={5}>
            <Link style={{ height: 18, alignSelf: 'flex-start', marginTop: '3px' }} to={recipe.link}>
              <LinkIcon />
            </Link>
          </Container>
        </Header>

        <Container vertical gap={10}>

          {recipe.pressignedUrl ? (
            <div>
              <StyledImg src={recipe.pressignedUrl} onClick={() => setPageOpen(true)} />
            </div>
          ) : (
            <div>
              <StyledNoImg onClick={() => setPageOpen(true)} />
            </div>
          )}

          { localDisplayInfo && (
            <Container>
              <Container gap={4}>
                <BigElement bold>
                  {recipe.calories.toFixed(recipe.calories % 1 > 0 ? 0 : undefined)}
                </BigElement>

                <Container vertical gap={6}>
                  <TagsContainer>
                    <Element>{recipe.protein.toFixed(recipe.protein % 1 > 0 ? 2 : undefined)}</Element>
                    <Element>{recipe.fats.toFixed(recipe.fats % 1 > 0 ? 1 : undefined)}</Element>
                    <Element>{recipe.carbohydrates.toFixed(recipe.carbohydrates % 1 > 0 ? 1 : undefined)}</Element>
                  </TagsContainer>
                  <TagNames gap={4}>
                    {visibleTags.map((t) => (
                      <TagName key={t.id}>
                        #
                        {t.name}
                      </TagName>
                    ))}
                    {restTagsCount > 0 && (
                    <RestTagsCount>
                      +
                      {restTagsCount}
                    </RestTagsCount>
                    )}
                  </TagNames>
                </Container>
              </Container>
              <Actions recipe={recipe} onDialogOpen={onDialogOpen} />
            </Container>
          )}
        </Container>

      </Container>
      <Container />
    </Card>
  );
};

const Actions: FC<{ recipe: Recipe; onDialogOpen: (recipe: Recipe) => void }> = ({ recipe, onDialogOpen }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
  });
  const [optionsOpen, setOptionsOpen] = useState(false);
  return (
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
          <Option onClick={() => deleteMutation.mutate(recipe)}>Удалить</Option>
          <Option onClick={() => onDialogOpen(recipe)}>Изменить</Option>
        </Options>
      )}
    </Dots>
  );
};

const Card = styled.div<{ localDisplayInfo: boolean }>`
  padding: 15px;
  width: 260px;
  height: ${({ localDisplayInfo }) => (localDisplayInfo ? '353px' : '293px')};
  
  color: #113C0F;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex-shrink: 0;

  border-radius: 20px;
  background: #FFF;
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
`;

const Header = styled(Container)`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.color.font}
`;
const LinkIcon = styled(LinkSvg)`
  height: 16px;
  width: 16px;
  margin-bottom: 1px;
`;

const FavoriteIcon = styled(FavoriteSvg)`
  height: 16px;
  width: 16px;
  cursor: pointer;
`;
const NonFavoriteIcon = styled(NonFavoriteSvg)`
  height: 16px;
  width: 16px;
  cursor: pointer;
`;

const Element = styled.div<{ bold?: boolean }>`
  background-color: ${theme.color.secondary};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${theme.color.primary};

  border: solid white 0.5px;
  border-radius: 7px;
  
  height: 25px;
  padding: 4px 7px;
  width: fit-content;
`;

const BigElement = styled.div<{ bold?: boolean }>`
  background-color: ${theme.color.secondary};
  font-size: 25px;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${theme.color.primary};

  border: solid white 0.5px;
  border-radius: 10px;
  
  height: 50px;
  width: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.div<{ src: string }>`
  width: 230px;
  height: 230px;
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 10px;
`;

const StyledNoImg = styled.div`
  width: 230px;
  height: 230px;
  border-radius: 10px;
`;

const TagsContainer = styled(Container)`
  flex-wrap: wrap;
  justify-content: flex-start;
  height: fit-content;
  gap: 4px;
`;

const Dot = styled.div`
  height: 4px;
  width: 4px;
  border-radius:  2px;
  flex-shrink: 0;
  background-color: ${theme.color.primary};
`;

const Dots = styled(Container)`
  cursor: pointer;
  align-self: flex-start;
  position: relative;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  
  padding: 2px;
  border-radius: 5px;
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
  
  right: 10px;
  top: -50px;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 197px;
`;

const StyledImg = styled(Img)`
  cursor: pointer;
`;

const TagNames = styled(Container)`
  width: 100%;
`;

const TagName = styled.div`
  color: ${theme.color.accent};
  cursor: pointer;
`;

const RestTagsCount = styled.div`
  border-radius: 5px;
  padding: 0 5px;
  background-color: ${theme.color.accent};
  color: white;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

export { RecipeCard };
