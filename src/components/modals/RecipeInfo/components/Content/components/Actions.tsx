import React, { useState } from 'react';
import { Recipe } from 'src/types/domain';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRecipe, fromFavorites, toFavorites } from 'src/api';
import { Confirmation } from 'src/components/modals/Confirmation';
import { Button } from 'src/components/features';
import { useToggleModal } from 'src/hooks';
import * as css from './Actions.css';

type Props = {
  recipe: Recipe;
};

export const Actions = ({ recipe }: Props) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
  });
  const toFavoritesMutation = useMutation({
    mutationFn: toFavorites,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
  const fromFavoritesMutation = useMutation({
    mutationFn: fromFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });

  const { open } = useToggleModal('recipe-edit', recipe.id.toString());

  return (
    <div className={css.actionsCard}>
      <Confirmation
        isLoading={deleteMutation.isPending}
        open={confirmOpen}
        title="Удаление рецепта"
        text="Вы уверены, что хотите удалить рецепт?"
        onClose={(result) => {
          if (result) {
            deleteMutation.mutate(recipe);
          }
          setConfirmOpen(false);
        }}
      />
      <Button kind="ghost" className={css.actionButton} onClick={open}>
        Изменить
      </Button>
      {recipe.favorite ? (
        <Button
          kind="ghost"
          onClick={() => fromFavoritesMutation.mutate(recipe.id)}
        >
          Из избранного
        </Button>
      ) : (
        <Button
          kind="ghost"
          onClick={() => toFavoritesMutation.mutate(recipe.id)}
        >
          В избранное
        </Button>
      )}
      <Button kind="ghost" onClick={() => setConfirmOpen(true)}>
        Удалить
      </Button>
    </div>
  );
};
