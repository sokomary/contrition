import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, ActionBar, Dialog } from 'src/components/features';
import { useLogic } from './useLogic';
import * as css from './index.css';

export const AddTag = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, register, submit, errors, actions } = useLogic();

  return (
    <Dialog
      header={t('startpage.tags.new.header')}
      isActive={isOpen}
      onClose={onClose}
      size='small'
    >
      <form onSubmit={submit} className={css.container}>
        <Field
          key='name'
          name='name'
          register={register}
          placeholder={t('domain.recipe.name')}
          error={errors.name}
        />
        <ActionBar actions={actions} className={css.actions} />
      </form>
    </Dialog>
  );
};
