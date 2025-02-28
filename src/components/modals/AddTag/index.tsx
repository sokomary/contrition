import React from 'react';
import i18next from 'src/formatter';
import { Modal, Field, ActionBar } from 'src/components/features';
import { useLogic } from './useLogic';

export const AddTag = () => {
  const { isOpen, onClose, register, submit, errors, screen, actions } =
    useLogic();

  return (
    <Modal
      position={screen === 'iphone' ? 'bottom' : undefined}
      width={screen !== 'iphone' ? 350 : undefined}
      header="Новый тег"
      isActive={isOpen}
      onClose={onClose}
    >
      <form onSubmit={submit}>
        <Field
          key="name"
          name="name"
          register={register}
          placeholder={i18next.t('domain:recipe.name')}
          error={errors.name}
          errorText={i18next.t('forms:fields.errors.required')}
          required
        />
        <ActionBar actions={actions} />
      </form>
    </Modal>
  );
};
