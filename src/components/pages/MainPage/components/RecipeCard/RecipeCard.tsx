import React, {
  CSSProperties, FC, useRef,
} from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { LinkIcon, FavoriteIcon } from 'src/assets';
import { Recipe, isAdmin } from 'src/domain';
import { Container } from 'src/components/features';
import { useAuthenticate } from 'src/hooks';
import { color } from 'src/theme';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';
import { NoImage } from '../../assets';
import { Actions } from './components/Actions';

const VISIBLE_TAGS_COUNT = 2;

type Props = {
  infoOpen?: boolean;
  recipe: Recipe;
  className?: string;
  style?: CSSProperties;
  onEditClick: () => void;
  onViewClick: () => void;
  displayInfo?: boolean;
  small?: boolean;
  onRecipeInfoOpenChange: (open: boolean) => void;
};

const RecipeCard: FC<Props> = ({
  className, recipe, infoOpen, onViewClick, onRecipeInfoOpenChange, onEditClick, style, displayInfo, small,
}) => {
  const visibleTags = recipe.tags.slice(0, VISIBLE_TAGS_COUNT);
  const restTagsCount = recipe.tags.length - 2;

  const user = useAuthenticate();

  const screen = useDeviceScreen();
  const localDisplayInfo = (displayInfo === undefined || displayInfo)
    && !(['iphone', 'ipadh', 'ipadv'].includes(screen)) && !small;

  const changeRecipeInfoOpen = (open: boolean) => {
    onRecipeInfoOpenChange(open);
    onViewClick();
  };

  const ref = useRef<HTMLImageElement>(null);

  return (
    <Card infoOpen={infoOpen} small={small} className={className} localDisplayInfo={localDisplayInfo} style={style}>

      <div style={{ height: '100%', width: '100%' }}>

        <MainContainer localDisplayInfo={localDisplayInfo}>
          {recipe.favorite && <StyledFavoriteIcon />}
          {!localDisplayInfo && <OnImageCalories>{recipe.calories.toFixed(0)}</OnImageCalories>}
          <StyledImg
            ref={ref}
            onError={() => {
              if (ref.current) {
                ref.current.src = NoImage;
              }
            }}
            src={recipe.pressignedUrl || NoImage}
            onClick={() => changeRecipeInfoOpen(true)}
          />
          <RecipeNameContainer>
            <Container>
              <RecipeName>{recipe.name}</RecipeName>
              {recipe.link.length > 1 && <LinkToRecipe to={recipe.link}><StyledLinkIcon /></LinkToRecipe>}
            </Container>
          </RecipeNameContainer>
        </MainContainer>

        {localDisplayInfo && (
          <InfoContainer>
            <Container gap={4}>
              <BigElement>
                {recipe.calories.toFixed(recipe.calories % 1 > 0 ? 0 : undefined)}
              </BigElement>

              <Container vertical>
                <TagsContainer>
                  <Element>{recipe.protein.toFixed(recipe.protein % 1 > 0 ? 0 : undefined)}</Element>
                  <Element>{recipe.fats.toFixed(recipe.fats % 1 > 0 ? 0 : undefined)}</Element>
                  <Element>{recipe.carbohydrates.toFixed(recipe.carbohydrates % 1 > 0 ? 0 : undefined)}</Element>
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
            {isAdmin(user) && <Actions recipe={recipe} onEditClick={onEditClick} />}
          </InfoContainer>
        )}
      </div>

      <Container />
    </Card>
  );
};

const Card = styled.div<{ localDisplayInfo: boolean; small?: boolean; infoOpen?: boolean }>`
  width: 268px;
  height: ${({ localDisplayInfo }) => (localDisplayInfo ? '345px' : '268px')};
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;

  border-radius: 20px;
  background: ${({ theme }) => color('basic', theme)};
  box-shadow: ${({ localDisplayInfo }) => (localDisplayInfo ? '0 0 20px 5px rgba(8, 8, 8, 0.10)' : 'none')};

  ${({ theme, small }) => ['ipadh'].includes(theme.screen) && css`
    width: ${small ? '170px' : '268px'};
    height: ${small ? '170px' : '268px'};
    border-radius: 15px;
  `};
  
  ${({ theme, small }) => ['ipadv'].includes(theme.screen) && css`
    width: ${small ? '170px' : '242px'};
    height: ${small ? '170px' : '242px'};
    border-radius: 15px;
  `};
  
  ${({ theme }) => theme.screen === 'iphone' && css`
    width: 170px;
    height: 170px;
    border-radius: 15px;
  `};
  
  ${({ theme, infoOpen }) => infoOpen && ['ipadh'].includes(theme.screen) && css`
    width: 242px;
    height: 242px;
  `};
`;

const StyledLinkIcon = styled(LinkIcon)`
  height: 16px;
  width: 16px;
  margin-bottom: 1px;
`;

const StyledFavoriteIcon = styled(FavoriteIcon)`
  height: 16px;
  width: 16px;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const OnImageCalories = styled.div`
  padding: 5px 10px;
  border-radius: 15px;
  color:  ${({ theme }) => color('accent', theme)};
  font-size: 14px;
  background-color: ${({ theme }) => color('accent-light', theme)};
  z-index: 80;
  position: absolute;
  left: 10px;
  top: 10px;
`;

const Element = styled.div`
  background-color: ${({ theme }) => color('accent-light', theme)};
  color: ${({ theme }) => color('accent', theme)};
  font-size: 16px;
  border-radius: 12px;
  height: 44px;
  width: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BigElement = styled.div`
  background-color: ${({ theme }) => color('accent-light', theme)};
  color: ${({ theme }) => color('accent', theme)};
  font-size: 20px;
  font-weight: bold;
  border-radius: 15px;
  height: 63px;
  width: 63px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  width: 268px;
  height: 268px;
  animation-name: img-appearance;
  animation-duration: 3s;
  animation-timing-function: cubic-bezier(.1,-.6,.2,0);
  cursor: pointer;
  flex-shrink: 0;
  ${({ theme }) => ['ipadv', 'ipadh', 'iphone'].includes(theme.screen) && css`
    width: 100%;
    height: 100%;
  `};
  @keyframes img-appearance {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }
`;

const TagsContainer = styled(Container)`
  flex-wrap: wrap;
  justify-content: flex-start;
  height: fit-content;
  gap: 4px;
`;

const RecipeNameContainer = styled.div`
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => color('field', theme)};
  width: 100%;
  padding: 15px 10px;
  font-size: 16px;
  ${({ theme }) => theme.screen === 'iphone' && css`
    font-size: 14px;
    height: 40px;
    padding: 10px;
  `};
`;

const RecipeName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color:  ${({ theme }) => color('font', theme)};
`;

const TagNames = styled(Container)`
  width: 100%;
`;

const TagName = styled.div`
  color: ${({ theme }) => color('label', theme)};
  cursor: pointer;
`;

const RestTagsCount = styled.div`
  border-radius: 5px;
  padding: 0 5px;
  background-color: ${({ theme }) => color('accent', theme)};
  color: white;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const LinkToRecipe = styled(Link)`
  height: 18px;
  align-self: flex-start;
  margin-top: 2px;
`;

const InfoContainer = styled(Container)`
  padding: 8px;
`;

const MainContainer = styled.div<{ localDisplayInfo?: boolean }>`
  position: relative;
  width: 268px;
  height: 268px;
  ${({ localDisplayInfo }) => (localDisplayInfo ? 'border-radius: 20px 20px 0 0;' : 'border-radius: 20px;')};
  overflow: hidden;
  flex-shrink: 0;
  ${({ theme }) => ['ipadv', 'ipadh', 'iphone'].includes(theme.screen) && css`
    width: 100%;
    height: 100%;
    border-radius: 15px;
  `};
`;

export { RecipeCard };
