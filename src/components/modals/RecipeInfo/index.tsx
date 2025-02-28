import React from 'react';
import { Modal } from 'src/components/features';
import { useDeviceScreen } from 'src/theme/useDeviceScreen';
import { useRouteModal } from 'src/router';
import { useQuery } from '@tanstack/react-query';
import { getRecipe } from 'src/api';
import { Header } from './components/Header';
import { Content } from './components/Content';

export const RecipeInfo = () => {
  const screen = useDeviceScreen();

  const { isOpen, value, onClose } = useRouteModal({
    key: 'recipe-info',
  });

  const id = parseInt(value, 10);

  const { data: recipe } = useQuery({
    queryKey: [`recipe-${id}`],
    queryFn: () => getRecipe(id),
    enabled: !Number.isNaN(id),
  });

  if (!recipe) return null;

  return (
    <Modal
      width={WIDTHS[screen]}
      position={['iphone', 'ipadv'].includes(screen) ? 'bottom' : 'right'}
      header={<Header recipe={recipe} />}
      isActive={isOpen}
      onClose={onClose}
    >
      <Content recipe={recipe} />
    </Modal>
  );
};

const WIDTHS: { [key: string]: number } = {
  mac: 500,
  ipadh: 500,
};
