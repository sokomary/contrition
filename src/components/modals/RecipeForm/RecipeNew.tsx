import React from 'react';
import { useRoutModal } from 'src/hooks';
import { RecipeForm } from './RecipeForm';

export const RecipeNew = () => {
  const { isOpen, onClose } = useRoutModal({
    key: 'recipe-new',
  });

  return <RecipeForm isOpen={isOpen} onClose={onClose} />;
};
