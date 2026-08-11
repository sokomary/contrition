import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { z } from 'zod';
import { tagsApi } from 'src/api';
import { Action } from 'src/components/features';
import { useRouteModal } from 'src/router';
import { requiredString } from 'src/utils';
import { toast } from 'react-toastify';

export const schema = (t: TFunction<'translation'>) =>
  z.object({
    name: requiredString(t),
  });

export type TForm = z.infer<ReturnType<typeof schema>>;

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

  const { register, handleSubmit, formState, reset } = useForm<TForm>({
    resolver: zodResolver(schema(t)),
    defaultValues: { name: '' },
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
    onClose,
    register,
    errors: formState.errors,
    submit: handleSubmit(onSubmit),
    actions,
  };
};
