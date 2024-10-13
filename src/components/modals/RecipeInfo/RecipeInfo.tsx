import React from 'react';
import { Recipe } from 'src/domain';
import { Modal } from 'src/components/features';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';
import { Header } from './components/Header';
import { Content } from './components/Content';

type Props = {
  open: boolean;
  onClose: () => void;
  recipe: Recipe;
  onEditClick: () => void;
};

export const RecipeInfo = ({
  open, onClose, recipe, onEditClick,
}: Props) => {
  const screen = useDeviceScreen();

  return (
    <Modal
      width={WIDTHS[screen]}
      position={['iphone', 'ipadv'].includes(screen) ? 'bottom' : 'right'}
      header={(<Header recipe={recipe} />)}
      isActive={open}
      onClose={onClose}
    >
      <Content recipe={recipe} onEditClick={onEditClick} />
    </Modal>
  );
};

const WIDTHS: { [key: string]: number } = {
  mac: 500,
  ipadh: 500,
};
