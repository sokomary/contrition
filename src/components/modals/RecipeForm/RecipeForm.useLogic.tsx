import { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addRecipe, getInstructions } from 'src/api';
import { Recipe } from 'src/types/domain';
import i18next from 'src/formatter';
import { Action } from 'src/components/features';
import { useDeviceScreen } from 'src/hooks';

export type Options = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Recipe;
};

export const useLogic = ({ defaultValues, isOpen, onClose }: Options) => {
  const { data: instructions, isLoading: areInstructionsLoading } = useQuery({
    queryKey: ['instructions'],
    queryFn: () => getInstructions(defaultValues!.id),
    enabled: defaultValues?.id !== undefined,
  });

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      reset();
      onClose();
    },
  });

  const { register, handleSubmit, control, reset, formState } = useForm<Recipe>(
    {
      defaultValues: defaultValues
        ? { ...defaultValues, instructions }
        : {
            recipeProducts: [],
            tags: [],
            instructions: [],
            favorite: false,
          },
    }
  );

  const onSubmit: SubmitHandler<Recipe> = (data) => addMutation.mutate(data);

  const divRef = useRef<HTMLDivElement>(null);

  const [openNewProduct, setOpenNewProduct] = useState(false);
  const [openNewTag, setOpenNewTag] = useState(false);

  const screen = useDeviceScreen();

  const actions: Action[] = [
    {
      kind: 'primary',
      type: 'submit',
      label: i18next.t('startpage:recipes.actions.save'),
    },
  ];

  return {
    isLoading: addMutation.isPending || areInstructionsLoading,
    defaultValues,
    isOpen,
    instructions,
    actions,
    register,
    handleSubmit,
    control,
    formState,
    onSubmit,
    divRef,
    openNewProduct,
    setOpenNewProduct,
    openNewTag,
    setOpenNewTag,
    screen,
    onClose: async () => {
      reset();
      onClose();
    },
  };
};
