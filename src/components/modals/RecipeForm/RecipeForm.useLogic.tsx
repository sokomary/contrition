import { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
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

  const onSubmit: SubmitHandler<Recipe> = (data) => addMutation.mutate(data);

  const divRef = useRef<HTMLDivElement>(null);

  const screen = useDeviceScreen();

  const actions: Action[] = [
    {
      kind: 'primary',
      type: 'submit',
      label: i18next.t('startpage:recipes.actions.save'),
      isLoading: addMutation.isPending,
    },
  ];

  return {
    defaultValues,
    isOpen,
    actions,
    register,
    handleSubmit,
    control,
    formState,
    onSubmit,
    divRef,
    screen,
    onClose: async () => {
      reset();
      onClose();
    },
  };
};
