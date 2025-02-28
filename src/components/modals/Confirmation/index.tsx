import React from 'react';
import { Action, ActionBar, Modal } from 'src/components/features';
import { useDeviceScreen } from 'src/theme';
import { useConfirmationToggle } from './useConfirmationToggle';
import * as css from './index.css';

export const Confirmation = () => {
  const { isOn, close, payload } = useConfirmationToggle();

  const screen = useDeviceScreen();

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
    <Modal
      position={screen === 'iphone' ? 'bottom' : undefined}
      width={screen !== 'iphone' ? 350 : undefined}
      header={payload?.title}
      isActive={isOn}
      onClose={close}
    >
      <div>{payload?.description}</div>
      <ActionBar actions={actions} className={css.actions} />
    </Modal>
  );
};
