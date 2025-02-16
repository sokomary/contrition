import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import i18next from 'src/formatter';
import { Tag } from 'src/types/domain';
import { addTag } from 'src/api';
import {
  Modal,
  Field,
  Loading,
  Action,
  ActionBar,
} from 'src/components/features';
import { useDeviceScreen } from 'src/hooks';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddTag = ({ open, onClose }: Props) => {
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      reset();
      onClose();
    },
  });

  const { register, handleSubmit, formState, reset } = useForm<Tag>();

  const screen = useDeviceScreen();

  const onSubmit: SubmitHandler<Tag> = (data) => addMutation.mutate(data);

  const actions: Action[] = [
    {
      kind: 'primary',
      type: 'submit',
      label: i18next.t('startpage:recipes.actions.save'),
    },
  ];

  return (
    <Modal
      position={screen === 'iphone' ? 'bottom' : undefined}
      width={screen !== 'iphone' ? 350 : undefined}
      header="Новый тег"
      isActive={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {!addMutation.isPending ? (
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
        ) : (
          <Loading />
        )}
      </form>
    </Modal>
  );
};
