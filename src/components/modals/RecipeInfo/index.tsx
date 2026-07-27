import React from 'react';
import { Dialog, Loading } from 'src/components/features';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { useLogic } from './useLogic';

export const RecipeInfo = () => {
  const { isOpen, onClose, isLoading, recipe } = useLogic();

  const renderContent = () => {
    if (isLoading) return <Loading />;

    if (!recipe) return null;

    return <Content recipe={recipe} />;
  };

  return (
    <Dialog
      header={recipe && <Header recipe={recipe} />}
      right
      isActive={isOpen}
      onClose={onClose}
    >
      {renderContent()}
    </Dialog>
  );
};
