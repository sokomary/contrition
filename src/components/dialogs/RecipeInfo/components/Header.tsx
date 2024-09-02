import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Recipe } from 'src/domain';
import { Container } from 'src/components/features';
import { ClearIcon, LinkIcon } from 'src/assets';
import { color } from 'src/theme';

export const Header = ({
  recipe,
  onClose,
}: { recipe: Recipe; onClose?: () => void }) => (
  <DialogHeaderContainer vertical gap={7}>
    <Container>
      <Container gap={4}>
        <div style={{
          alignSelf: 'flex-start',
          marginTop: 3,
          fontWeight: 'medium',
          fontSize: 18,
          width: 'fit-content',
          maxWidth: 260,
        }}
        >
          {recipe.name}
        </div>
        {recipe.link.length > 1 && <LinkToRecipe to={recipe.link}><StyledLinkIcon /></LinkToRecipe>}
      </Container>
      {onClose && <ClearIcon style={{ cursor: 'pointer' }} onClick={onClose} />}
    </Container>
    <Container gap={4}>
      <Element bold>
        {recipe.calories.toFixed(recipe.calories % 1 > 0 ? 0 : undefined)}
      </Element>
      <Element>{recipe.protein.toFixed(recipe.protein % 1 > 0 ? 0 : undefined)}</Element>
      <Element>{recipe.fats.toFixed(recipe.fats % 1 > 0 ? 0 : undefined)}</Element>
      <Element>{recipe.carbohydrates.toFixed(recipe.carbohydrates % 1 > 0 ? 0 : undefined)}</Element>
    </Container>
  </DialogHeaderContainer>
);

const DialogHeaderContainer = styled(Container)`
  ${({ theme }) => ['mac'].includes(theme.screen) && css`
    padding: 40px 40px 0 40px;
  `};
  ${({ theme }) => ['ipadh'].includes(theme.screen) && css`
    padding: 20px 20px 0 20px;
  `};
  ${({ theme }) => theme.screen === 'ipadv' && css`
    padding: 10px 20px;
  `};
  ${({ theme }) => theme.screen === 'iphone' && css`
    padding: 0 20px;
  `};
`;

const LinkToRecipe = styled(Link)`
  height: 18px;
  align-self: flex-start;
  margin-top: 5px;
`;

const StyledLinkIcon = styled(LinkIcon)`
  height: 20px;
  width: 20px;
  margin-bottom: 1px;
`;

const Element = styled.div<{ bold?: boolean }>`
  background-color: ${({ theme }) => color('accent-light', theme)};
  color: ${({ theme }) => color('accent', theme)};
  font-size: 14px;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  border-radius: 7px;
  height: 25px;
  padding: 0 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
