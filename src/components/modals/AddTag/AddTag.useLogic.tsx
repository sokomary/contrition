import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import i18next from 'src/formatter';
import { Tag } from 'src/types/domain';
import { addTag } from 'src/api';
import { Action } from 'src/components/features';
import { useRouteModal } from 'src/router';
import { useDeviceScreen } from 'src/theme';
import { toast } from 'react-toastify';

export const useLogic = () => {
  const { isOpen, onClose } = useRouteModal({
    key: 'tag-new',
  });

  const screen = useDeviceScreen();

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      reset();
      toast('Тэг успешно добавлен');
      onClose();
    },
    onError: () => toast('Что-то пошло не так'),
  });

  const { register, handleSubmit, formState, reset } = useForm<Tag>();
  const onSubmit: SubmitHandler<Tag> = (data) => addMutation.mutate(data);
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
    onClose,
    register,
    errors: formState.errors,
    screen,
    submit: handleSubmit(onSubmit),
    actions,
  };
};
