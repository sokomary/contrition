import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useConfirmation, useToggleModal } from 'src/components/modals';
import { Recipe } from 'src/types/domain';
import { deleteRecipe, fromFavorites, toFavorites } from 'src/api';
import { Action } from 'src/components/features';
import { useRouteModal } from 'src/router';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  IconEdit,
  IconFavorite,
  IconNonFavorite,
  IconShare,
  IconTrash,
} from '../../assets';

type Options = {
  recipe: Recipe;
  onSuccess?: () => void;
};

// todo think of removing a recipe which was shared with me once
// but I don't want to have it anymore
// in case 1) one time sharing 2) continuous sharing

export const useRecipeActions = ({
  recipe,
  onSuccess: propsOnSuccess,
}: Options): Action[] => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { open } = useToggleModal('recipe-edit', recipe.id.toString());
  const { open: openShare } = useToggleModal(
    'recipe-share',
    recipe.id.toString(),
  );
  const { onClose } = useRouteModal({ key: 'recipe-info' });

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['recipes'],
    });
    queryClient.invalidateQueries({
      queryKey: [`recipe-${recipe.id}`],
    });
    if (propsOnSuccess) {
      propsOnSuccess();
    }
  };

  const removeMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      removeConfirmation.close();
      toast(t('startpage.recipes.removed'));
      onSuccess();
      onClose();
    },
  });

  const removeConfirmation = useConfirmation({
    title: t('startpage.recipes.removeConfirm.title'),
    description: t('startpage.recipes.removeConfirm.description'),
    confirm: {
      label: t('startpage.recipes.actions.delete'),
      kind: 'primary',
      isLoading: removeMutation.isPending,
      onClick: () => removeMutation.mutate(recipe),
    },
  });

  const toFavoritesMutation = useMutation({
    mutationFn: toFavorites,
    onSuccess: () => {
      toast(t('startpage.recipes.favorites.added'));
      onSuccess();
    },
  });

  const fromFavoritesMutation = useMutation({
    mutationFn: fromFavorites,
    onSuccess: () => {
      toast(t('startpage.recipes.favorites.removed'));
      onSuccess();
    },
  });

  return [
    {
      kind: 'ghost',
      onClick: open,
      label: t('startpage.recipes.actions.edit'),
      startGraphic: <IconEdit />,
    },
    {
      kind: 'ghost',
      onClick: () => toFavoritesMutation.mutate(recipe.id),
      label: t('startpage.recipes.actions.toFavorites'),
      display: !recipe.favorite,
      isLoading: toFavoritesMutation.isPending,
      startGraphic: <IconFavorite />,
    },
    {
      kind: 'ghost',
      onClick: () => fromFavoritesMutation.mutate(recipe.id),
      label: t('startpage.recipes.actions.fromFavorites'),
      display: recipe.favorite,
      isLoading: fromFavoritesMutation.isPending,
      startGraphic: <IconNonFavorite />,
    },
    {
      kind: 'ghost',
      onClick: openShare,
      label: t('startpage.recipes.actions.share'),
      startGraphic: <IconShare />,
    },
    {
      kind: 'ghost',
      onClick: () => removeConfirmation.open(),
      label: t('startpage.recipes.actions.delete'),
      isLoading: removeMutation.isPending,
      startGraphic: <IconTrash />,
    },
  ];
};
