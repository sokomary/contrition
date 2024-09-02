import React from 'react';
import {
  Dialog,
} from 'src/components/features';
import styled from 'styled-components';
import { color } from 'src/theme';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';
import { Content } from './components/Content';

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
  const renderContent = () => <Content text={text} onClose={onClose} />;

  return (
    <>
      {open && screen === 'iphone' && (
        <MobileDialog>{renderContent()}</MobileDialog>
      )}
      <Dialog width={350} header={title} visible={open && screen !== 'iphone'} onClose={() => onClose(false)}>
        {renderContent()}
      </Dialog>
    </>
  );
};

const MobileDialog = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => color('background-transparent', theme)};
  height: 100%;
  width:  100%;
  z-index: 99;
  display: flex;
  flex-direction: column;
  padding: 30px 15px;
  justify-content: flex-end;
  gap: 5px;
`;
