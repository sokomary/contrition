import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useConfirmation, useToggleModal } from 'src/components/modals';
import { Recipe } from 'src/types/domain';
import { deleteRecipe, fromFavorites, toFavorites } from 'src/api';
import { Action } from 'src/components/features';
import { useRouteModal } from 'src/router';

type Options = {
  recipe: Recipe;
};

export const useRecipeActions = ({ recipe }: Options): Action[] => {
  const queryClient = useQueryClient();

  const { open } = useToggleModal('recipe-edit', recipe.id.toString());
  const { onClose } = useRouteModal({ key: 'recipe-info' });

  const onSuccess = () =>
    queryClient.invalidateQueries({ queryKey: ['recipes'] });

  const removeMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      onSuccess();
      removeConfirmation.close();
      onClose();
    },
  });

  const removeConfirmation = useConfirmation({
    title: 'Удаление рецепта',
    description: 'Вы уверены, что хотите удалить рецепт?',
    confirm: {
      label: 'Удалить',
      kind: 'primary',
      isLoading: removeMutation.isPending,
      onClick: () => removeMutation.mutate(recipe),
    },
  });

  const toFavoritesMutation = useMutation({
    mutationFn: toFavorites,
    onSuccess,
  });

  const fromFavoritesMutation = useMutation({
    mutationFn: fromFavorites,
    onSuccess,
  });

  return [
    {
      kind: 'ghost',
      onClick: open,
      label: 'Изменить',
    },
    {
      kind: 'ghost',
      onClick: () => toFavoritesMutation.mutate(recipe.id),
      label: 'В избранное',
      display: !recipe.favorite,
    },
    {
      kind: 'ghost',
      onClick: () => fromFavoritesMutation.mutate(recipe.id),
      label: 'Из избранного',
      display: recipe.favorite,
    },
    {
      kind: 'ghost',
      onClick: () => removeConfirmation.open(),
      label: 'Удалить',
    },
  ];
};
