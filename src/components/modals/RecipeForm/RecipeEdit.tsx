import React from 'react';
import { useRoutModal } from 'src/hooks';
import { useQuery } from '@tanstack/react-query';
import { getRecipe } from 'src/api';
import { RecipeForm } from './RecipeForm';

export const RecipeEdit = () => {
  const { isOpen, value, onClose } = useRoutModal({
    key: 'recipe-edit',
  });

  const id = parseInt(value, 10);

  const { data: defaultValues } = useQuery({
    queryKey: [`recipes`],
    queryFn: () => getRecipe(id),
    enabled: !Number.isNaN(id),
  });

  return (
    defaultValues && (
      <RecipeForm
        isOpen={isOpen}
        onClose={onClose}
        defaultValues={defaultValues}
      />
    )
  );
};
