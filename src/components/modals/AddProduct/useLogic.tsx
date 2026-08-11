import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from 'src/api';
import { Action } from 'src/components/features';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { z } from 'zod';
import { useRouteModal } from 'src/router';
import { requiredNumber, requiredString } from 'src/utils';
import { toast } from 'react-toastify';

export const schema = (t: TFunction<'translation'>) =>
  z.object({
    name: requiredString(t),
    calories: requiredNumber(t),
    protein: requiredNumber(t),
    fats: requiredNumber(t),
    carbohydrates: requiredNumber(t),
  });

export type TFormIn = z.input<ReturnType<typeof schema>>;
export type TForm = z.output<ReturnType<typeof schema>>;

export const useLogic = () => {
  const { t } = useTranslation();
  const { isOpen, onClose } = useRouteModal({
    key: 'product-new',
  });

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      reset();
      toast(t('startpage.products.added'));
      onClose();
    },
    onError: () => toast(t('errors.somethingWentWrong')),
  });

  const { register, handleSubmit, formState, reset } = useForm<
    TFormIn,
    any,
    TForm
  >({
    resolver: zodResolver(schema(t)),
  });
  const onSubmit: SubmitHandler<TForm> = (data) => addMutation.mutate(data);
  const actions: Action[] = [
    {
      kind: 'primary',
      type: 'submit',
      label: t('startpage.recipes.actions.save'),
      isLoading: addMutation.isPending,
    },
  ];

  return {
    isOpen,
    register,
    submit: handleSubmit(onSubmit),
    errors: formState.errors,
    onClose,
    actions,
  };
};
