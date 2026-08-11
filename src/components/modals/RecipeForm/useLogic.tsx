import { Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { recipesApi } from 'src/api';
import { Recipe } from 'src/types/domain';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { z } from 'zod';
import { Action } from 'src/components/features';
import { useDeviceScreen } from 'src/theme';
import { optionalNumber, requiredNumber, requiredString } from 'src/utils';
import { toast } from 'react-toastify';

export const schema = (t: TFunction<'translation'>) =>
  z.looseObject({
    name: requiredString(t),
    link: z.string().optional(),
    comment: z.string().optional(),
    size: requiredNumber(t),
    portionSize: optionalNumber(t),
    recipeProducts: z
      .array(z.unknown())
      .min(1, t('startpage.recipes.errors.products')),
    tags: z.array(z.unknown()).min(1, t('startpage.recipes.errors.tags')),
  });

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
    mutationFn: recipesApi.create,
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
      toast(
        defaultValues
          ? t('startpage.recipes.updated')
          : t('startpage.recipes.added'),
      );
      onClose();
    },
    onError: () => toast(t('errors.somethingWentWrong')),
  });

  const { register, handleSubmit, control, reset, formState } = useForm<Recipe>(
    {
      resolver: zodResolver(schema(t)) as unknown as Resolver<Recipe>,
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
