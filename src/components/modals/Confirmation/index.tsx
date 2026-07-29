import React from 'react';
import { useTranslation } from 'react-i18next';
import { Action, ActionBar, Dialog } from 'src/components/features';
import { useConfirmationToggle } from './useConfirmationToggle';
import * as css from './index.css';

export const Confirmation = () => {
  const { t } = useTranslation();
  const { isOn, close, payload } = useConfirmationToggle();

  const actions: Action[] = [
    {
      label: t('modals.confirmation.actions.cancel.label'),
      kind: 'secondary',
      onClick: () => {
        payload?.onClose?.();
        close();
      },
    },
    { ...payload?.confirm },
  ];

  return (
    <Dialog
      size='small'
      header={payload?.title}
      isActive={isOn}
      onClose={close}
    >
      <div>{payload?.description}</div>
      <ActionBar actions={actions} className={css.actions} />
    </Dialog>
  );
};
