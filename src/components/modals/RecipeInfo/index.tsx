import React from 'react';
import { Loading, Modal } from 'src/components/features';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { useLogic, WIDTHS } from './useLogic';

export const RecipeInfo = () => {
  const { isOpen, onClose, isLoading, recipe, screen } = useLogic();

  const renderContent = () => {
    if (isLoading) return <Loading />;

    if (!recipe) return null;

    return <Content recipe={recipe} />;
  };

  return (
    <Modal
      width={WIDTHS[screen]}
      position={['iphone', 'ipadv'].includes(screen) ? 'bottom' : 'right'}
      header={recipe && <Header recipe={recipe} />}
      isActive={isOpen}
      onClose={onClose}
    >
      {renderContent()}
    </Modal>
  );
};
