import React, { CSSProperties, FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { LinkIcon, FavoriteIcon, NonFavoriteIcon } from 'src/assets';
import {
  deleteRecipe, fromFavorites, toFavorites,
} from 'src/api';
import { Recipe, isAdmin } from 'src/domain';
import { Container } from 'src/components/features';
import { useAuthenticate } from 'src/hooks';
import { color } from 'src/theme';
import { RecipeInfo } from 'src/components/dialogs';

const VISIBLE_TAGS_COUNT = 2;
const RecipeCard: FC<{
  recipe: Recipe; style?: CSSProperties; onDialogOpen: (recipe: Recipe) => void; displayInfo?: boolean; }> = ({
  recipe, style, onDialogOpen, displayInfo,
}) => {
  const [pageOpen, setPageOpen] = useState(false);
  const visibleTags = recipe.tags.slice(0, VISIBLE_TAGS_COUNT);
  const restTagsCount = recipe.tags.length - 2;

  const user = useAuthenticate();

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
        <RecipeInfo
          recipe={recipe}
          open={pageOpen}
          onClose={() => setPageOpen(false)}
        />
      )}

      <Container vertical gap={10}>

        <Header>
          <Container style={{ alignItems: 'center' }} gap={3}>
            {isAdmin(user) && (
              <>
                {recipe.favorite
                  ? <StyledFavoriteIcon onClick={() => fromFavoritesMutation.mutate(recipe.id)} />
                  : <StyledNonFavoriteIcon onClick={() => toFavoritesMutation.mutate(recipe.id)} />}
              </>
            )}
            <RecipeName onClick={() => setPageOpen(true)}>{recipe.name}</RecipeName>
          </Container>

          {recipe.link.length > 1 && <LinkToRecipe to={recipe.link}><StyledLinkIcon /></LinkToRecipe>}
        </Header>

        <Container vertical gap={10}>

          {recipe.pressignedUrl
            ? <StyledImg src={recipe.pressignedUrl} onClick={() => setPageOpen(true)} />
            : <StyledNoImg onClick={() => setPageOpen(true)} />}

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
              {isAdmin(user) && <Actions recipe={recipe} onDialogOpen={onDialogOpen} />}
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
          <Option onClick={() => onDialogOpen(recipe)}>Изменить</Option>
          <Option negative onClick={() => deleteMutation.mutate(recipe)}>Удалить</Option>
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
  background: ${color('background')};
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
`;

const Header = styled(Container)`
  font-size: 20px;
  font-weight: bold;
  color: ${color('font')};
`;
const StyledLinkIcon = styled(LinkIcon)`
  height: 16px;
  width: 16px;
  margin-bottom: 1px;
`;

const StyledFavoriteIcon = styled(FavoriteIcon)`
  height: 16px;
  width: 16px;
  cursor: pointer;
`;
const StyledNonFavoriteIcon = styled(NonFavoriteIcon)`
  height: 16px;
  width: 16px;
  cursor: pointer;
`;

const Element = styled.div<{ bold?: boolean }>`
  background-color: ${color('secondary')};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${color('primary')};

  border-radius: 7px;
  
  height: 25px;
  padding: 4px 7px;
  width: fit-content;
`;

const BigElement = styled.div<{ bold?: boolean }>`
  background-color: ${color('secondary')};
  font-size: 25px;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${color('primary')};

  border-radius: 10px;
  
  height: 50px;
  width: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
 width: 230px;
 height: 230px;
  animation-name: img-appearance;
  animation-duration: 3s;
  animation-timing-function: cubic-bezier(.1,-.6,.2,0);
  @keyframes img-appearance {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }
  cursor: pointer;
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
  background-color: ${color('primary')};
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

const Option = styled.div<{ negative?: boolean }>`
  width: 70px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 4px;
  color: ${({ negative }) => (negative ? color('danger') : '')}};
  &:hover {
    color: ${color('primary')}
  }
`;

const RecipeName = styled.div`
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 197px;
`;

const TagNames = styled(Container)`
  width: 100%;
`;

const TagName = styled.div`
  color: ${color('accent')};
  cursor: pointer;
`;

const RestTagsCount = styled.div`
  border-radius: 5px;
  padding: 0 5px;
  background-color: ${color('accent')};
  color: white;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const LinkToRecipe = styled(Link)`
  height: 18px;
  align-self: flex-start;
  margin-top: 3px;
`;

export { RecipeCard };
