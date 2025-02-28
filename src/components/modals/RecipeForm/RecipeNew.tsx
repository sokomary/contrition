import React from 'react';
import { useRouteModal } from 'src/router';
import { Form } from './Form';

export const RecipeNew = () => {
  const { isOpen, onClose } = useRouteModal({
    key: 'recipe-new',
  });

  return <Form isOpen={isOpen} onClose={onClose} />;
};
