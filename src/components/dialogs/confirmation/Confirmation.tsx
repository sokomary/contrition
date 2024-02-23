import React, {
  FC,
} from 'react';
import {
  Button, Container, Dialog,
} from 'src/components/features';
import styled from 'styled-components';
import { color } from 'src/theme';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';

export const Confirmation: FC<{ title: string; text: string; open: boolean; onClose: (result: boolean) => void }> = ({
  title, text, open, onClose,
}) => {
  const screen = useDeviceScreen();
  return (
    <>
      {open && screen === 'iphone'
        && (
        <MobileDialog>
          <ConfirmButton onClick={() => onClose(true)}>Ок</ConfirmButton>
          <CancelButton onClick={() => onClose(false)}>Отмена</CancelButton>
        </MobileDialog>
        )}
      <Dialog width={350} header={title} visible={open && screen !== 'iphone'} onClose={() => onClose(false)}>
        <Container vertical gap={15}>
          <div>{text}</div>
          <Container gap={5}>
            <Button onClick={() => onClose(false)}>Отмена</Button>
            <Button onClick={() => onClose(true)}>Ок</Button>
          </Container>
        </Container>
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

const CancelButton = styled(Button)`
  height: 61px;
  width: 100%;
  background-color: ${({ theme }) => color('secondary', theme)};
  color:  ${({ theme }) => color('primary', theme)};
`;

const ConfirmButton = styled(Button)`
  height: 61px;
  width: 100%;
  background-color: ${({ theme }) => color('primary', theme)};
  color:  ${({ theme }) => color('basic', theme)};
`;
