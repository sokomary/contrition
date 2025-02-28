import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addRecipe } from 'src/api';
import { Recipe } from 'src/types/domain';
import i18next from 'src/formatter';
import { Action } from 'src/components/features';
import { useDeviceScreen } from 'src/theme';
import { toast } from 'react-toastify';

export type Options = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Recipe;
};

export const useLogic = ({ defaultValues, isOpen, onClose }: Options) => {
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
    }
  );

  const actions: Action[] = [
    {
      kind: 'primary',
      type: 'submit',
      label: i18next.t('startpage:recipes.actions.save'),
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
      : i18next.t('startpage:recipes.new.header'),
  };
};
