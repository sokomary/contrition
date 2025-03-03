import React from 'react';
import { useRouteModal } from 'src/router';
import { useQuery } from '@tanstack/react-query';
import { getInstructions, getRecipe } from 'src/api';
import { Form } from './Form';

export const RecipeEdit = () => {
  const { isOpen, value, onClose } = useRouteModal({
    key: 'recipe-edit',
  });

  const id = parseInt(value, 10);

  const { data: defaultValues } = useQuery({
    queryKey: [`recipe-${id}`],
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
      <Form
        isOpen={isOpen}
        onClose={onClose}
        defaultValues={{ ...defaultValues, instructions }}
      />
    )
  );
};
