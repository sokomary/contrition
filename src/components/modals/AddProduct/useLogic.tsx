import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from 'src/api';
import { Product } from 'src/types/domain';
import { Action } from 'src/components/features';
import i18next from 'src/formatter';
import { useDeviceScreen } from 'src/theme/useDeviceScreen';
import { useRouteModal } from 'src/router';
import { toast } from 'react-toastify';

export const useLogic = () => {
  const { isOpen, onClose } = useRouteModal({
    key: 'product-new',
  });

  const screen = useDeviceScreen();

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      reset();
      toast('Продукт успешно добавлен');
      onClose();
    },
    onError: () => toast('Что-то пошло не так'),
  });

  const { register, handleSubmit, formState, reset } = useForm<Product>();
  const onSubmit: SubmitHandler<Product> = (data) => addMutation.mutate(data);
  const actions: Action[] = [
    {
      kind: 'primary',
      type: 'submit',
      label: i18next.t('startpage:recipes.actions.save'),
      isLoading: addMutation.isPending,
    },
  ];

  return {
    isOpen,
    register,
    submit: handleSubmit(onSubmit),
    errors: formState.errors,
    screen,
    onClose,
    actions,
  };
};
