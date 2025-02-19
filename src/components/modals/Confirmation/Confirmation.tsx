import React from 'react';
import { Action, ActionBar, Modal } from 'src/components/features';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';

type Props = {
  title: string;
  text: string;
  open: boolean;
  onClose: (result: boolean) => void;
  isLoading: boolean;
};

export const Confirmation = ({
  title,
  text,
  open,
  onClose,
  isLoading,
}: Props) => {
  const screen = useDeviceScreen();

  const actions: Action[] = [
    { kind: 'primary', label: 'Ок', onClick: () => onClose(true), isLoading },
    { label: 'Отмена', onClick: () => onClose(true), disabled: isLoading },
  ];

  return (
    <Modal
      width={350}
      header={title}
      isActive={open && screen !== 'iphone'}
      onClose={() => onClose(false)}
    >
      <div>{text}</div>
      <ActionBar actions={actions} />
    </Modal>
  );
};
