import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Recipe } from 'src/domain';
import { Dialog } from 'src/components/features';
import { color } from 'src/theme';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';
import { Header } from './components/Header';
import { Content } from './components/Content';

type Props = {
  open: boolean;
  onClose: () => void;
  recipe: Recipe;
  onEditClick: () => void;
  inline?: boolean;
};

export const RecipeInfo = ({
  open, onClose, recipe, onEditClick, inline,
}: Props) => {
  const screen = useDeviceScreen();

  return (
    <>
      {inline ? (
        <InlineDialog>
          <Header recipe={recipe} onClose={onClose} />
          <Content recipe={recipe} onEditClick={onEditClick} />
        </InlineDialog>
      ) : (
        <StyledDialog
          width={WIDTHS[screen]}
          position={['iphone', 'ipadv'].includes(screen) ? 'bottom' : 'right'}
          header={(<Header recipe={recipe} />)}
          visible={open}
          onClose={onClose}
        >
          <Content recipe={recipe} onEditClick={onEditClick} />
        </StyledDialog>
      )}
    </>
  );
};

const InlineDialog = styled.div`
  height: 100vh;
  width: 517px;
  ${({ theme }) => theme.screen === 'ipadh' && css`
    width: 367px;
  `};
  background-color: ${({ theme }) => color('basic', theme)};
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
  color: ${({ theme }) => color('font', theme)};
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
  overflow: auto;
  animation-duration:  0.6s;
  animation-name: recipeInfo;

  @keyframes recipeInfo {
    0% {
      margin-right: -400px;
    }
    100% {
      margin-right: 0;
    }
  }
`;

const StyledDialog = styled(Dialog)`
  ${({ theme }) => theme.screen !== 'iphone' && css`
    height: 100vh;
    flex-direction: column;
  `};
`;

const WIDTHS: { [key: string]: number } = {
  mac: 800,
  ipadh: 367,
};
