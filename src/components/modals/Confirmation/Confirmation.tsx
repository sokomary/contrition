import React from 'react';
import {
  Action, ActionBar,
  Modal,
} from 'src/components/features';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';

type Props = {
  title: string;
  text: string;
  open: boolean;
  onClose: (result: boolean) => void;
};

export const Confirmation = ({
  title, text, open, onClose,
}: Props) => {
  const screen = useDeviceScreen();

  const actions: Action[] = [
    { kind: 'primary', label: 'Ок', onClick: () => onClose(true) },
    { label: 'Отмена', onClick: () => onClose(true) },
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
