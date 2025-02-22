import React from 'react';
import { useRouteModal } from 'src/router';
import { RecipeForm } from './RecipeForm';

export const RecipeNew = () => {
  const { isOpen, onClose } = useRouteModal({
    key: 'recipe-new',
  });

  return <RecipeForm isOpen={isOpen} onClose={onClose} />;
};
