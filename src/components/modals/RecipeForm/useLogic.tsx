import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addRecipe } from 'src/api';
import { Recipe } from 'src/types/domain';
import { useTranslation } from 'react-i18next';
import { Action } from 'src/components/features';
import { useDeviceScreen } from 'src/theme';
import { toast } from 'react-toastify';

export type Options = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Recipe;
};

export const useLogic = ({ defaultValues, isOpen, onClose }: Options) => {
  const { t } = useTranslation();
  const screen = useDeviceScreen();

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      if (defaultValues) {
        queryClient.invalidateQueries({
          queryKey: [`recipe-${defaultValues.id}`],
        });
        queryClient.invalidateQueries({
          queryKey: ['menu-products'],
        });
      }
      reset();
      toast(`Рецепт ${defaultValues ? 'обновлен' : 'добавлен'}`);
      onClose();
    },
    onError: () => toast('Что-то пошло не так'),
  });

  const { register, handleSubmit, control, reset, formState } = useForm<Recipe>(
    {
      defaultValues: defaultValues || {
        recipeProducts: [],
        tags: [],
        instructions: [],
        favorite: false,
      },
    },
  );

  const actions: Action[] = [
    {
      kind: 'primary',
      type: 'submit',
      label: t('startpage.recipes.actions.save'),
      isLoading: addMutation.isPending,
    },
  ];

  return {
    screen,
    defaultValues,
    isOpen,
    actions,
    register,
    handleSubmit,
    control,
    errors: formState.errors,
    onSubmit: handleSubmit((data) => addMutation.mutate(data)),
    onClose: async () => {
      reset();
      onClose();
    },
    title: defaultValues
      ? defaultValues.name
      : t('startpage.recipes.new.header'),
  };
};
