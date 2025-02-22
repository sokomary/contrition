import React from 'react';
import { Action, ActionBar, Modal } from 'src/components/features';
import { useConfirmationToggle } from './useConfirmationToggle';

export const Confirmation = () => {
  const { isOn, close, payload } = useConfirmationToggle();

  const actions: Action[] = [
    { ...payload?.confirm },
    {
      label: 'Отмена',
      onClick: () => {
        payload?.onClose?.();
        close();
      },
    },
  ];

  return (
    <Modal width={350} header={payload?.title} isActive={isOn} onClose={close}>
      <div>{payload?.description}</div>
      <ActionBar actions={actions} />
    </Modal>
  );
};
