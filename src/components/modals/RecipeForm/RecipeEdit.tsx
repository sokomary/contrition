import React from 'react';
import { useRoutModal } from 'src/hooks';
import { useQuery } from '@tanstack/react-query';
import { getInstructions, getRecipe } from 'src/api';
import { RecipeForm } from './RecipeForm';

export const RecipeEdit = () => {
  const { isOpen, value, onClose } = useRoutModal({
    key: 'recipe-edit',
  });

  const id = parseInt(value, 10);

  const { data: defaultValues } = useQuery({
    queryKey: [`recipes-${id}`],
    queryFn: () => getRecipe(id),
    enabled: !Number.isNaN(id),
  });
  const { data: instructions } = useQuery({
    queryKey: [`instructions-${id}`],
    queryFn: () => getInstructions(id),
    enabled: !Number.isNaN(id),
  });

  return (
    defaultValues &&
    instructions && (
      <RecipeForm
        isOpen={isOpen}
        onClose={onClose}
        defaultValues={{ ...defaultValues, instructions }}
      />
    )
  );
};
