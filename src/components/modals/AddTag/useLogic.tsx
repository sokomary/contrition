import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Tag } from 'src/types/domain';
import { tagsApi } from 'src/api';
import { Action } from 'src/components/features';
import { useRouteModal } from 'src/router';
import { toast } from 'react-toastify';

export const useLogic = () => {
  const { t } = useTranslation();
  const { isOpen, onClose } = useRouteModal({
    key: 'tag-new',
  });

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: tagsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      reset();
      toast(t('startpage.tags.added'));
      onClose();
    },
    onError: () => toast(t('errors.somethingWentWrong')),
  });

  const { register, handleSubmit, formState, reset } = useForm<Tag>();
  const onSubmit: SubmitHandler<Tag> = (data) => addMutation.mutate(data);
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
    onClose,
    register,
    errors: formState.errors,
    submit: handleSubmit(onSubmit),
    actions,
  };
};
