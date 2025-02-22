import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import i18next from 'src/formatter';
import { Tag } from 'src/types/domain';
import { addTag } from 'src/api';
import { Modal, Field, Action, ActionBar } from 'src/components/features';
import { useRouteModal } from 'src/router';
import { useDeviceScreen } from 'src/theme';
import { toast } from 'react-toastify';

export const AddTag = () => {
  const { isOpen, onClose } = useRouteModal({
    key: 'tag-new',
  });

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

  const screen = useDeviceScreen();

  const onSubmit: SubmitHandler<Tag> = (data) => addMutation.mutate(data);

  const actions: Action[] = [
    {
      kind: 'primary',
      type: 'submit',
      label: i18next.t('startpage:recipes.actions.save'),
      isLoading: addMutation.isPending,
    },
  ];

  return (
    <Modal
      position={screen === 'iphone' ? 'bottom' : undefined}
      width={screen !== 'iphone' ? 350 : undefined}
      header="Новый тег"
      isActive={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field
            key="name"
            name="name"
            register={register}
            placeholder={i18next.t('domain:recipe.name')}
            error={formState.errors.name}
            errorText={i18next.t('forms:fields.errors.required')}
            required
          />
          <ActionBar actions={actions} />
        </div>
      </form>
    </Modal>
  );
};
