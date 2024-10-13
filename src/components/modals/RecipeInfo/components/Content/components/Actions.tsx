import React, { useState } from 'react';
import { Recipe } from 'src/domain';
import { useMutation, useQueryClient } from 'react-query';
import { deleteRecipe, fromFavorites, toFavorites } from 'src/api';
import { Confirmation } from 'src/components/modals/Confirmation';
import { Button } from 'src/components/features';
import * as css from './Actions.css';

type Props = {
  recipe: Recipe;
  onEditClick: (recipe: Recipe) => void;
};

export const Actions = ({ recipe, onEditClick }: Props) => {
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

  return (
    <div className={css.actionsCard}>
      <Confirmation
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
      <Button kind="ghost" className={css.actionButton} onClick={() => onEditClick(recipe)}>Изменить</Button>
      {recipe.favorite
        ? <Button kind="ghost" onClick={() => fromFavoritesMutation.mutate(recipe.id)}>Из избранного</Button>
        : <Button kind="ghost" onClick={() => toFavoritesMutation.mutate(recipe.id)}>В избранное</Button>}
      <Button kind="ghost" onClick={() => setConfirmOpen(true)}>Удалить</Button>
    </div>
  );
};
