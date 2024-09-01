import React from 'react';
import {
  Button, Container, Dialog,
} from 'src/components/features';
import styled, { css } from 'styled-components';
import { color } from 'src/theme';
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
  return (
    <>
      {open && screen === 'iphone' && (
        <MobileDialog><Content text={text} onClose={onClose} /></MobileDialog>
      )}
      <Dialog width={350} header={title} visible={open && screen !== 'iphone'} onClose={() => onClose(false)}>
        <Content text={text} onClose={onClose} />
      </Dialog>
    </>
  );
};

const Content = ({ text, onClose }: { text?: string; onClose: (res: boolean) => void }) => {
  const screen = useDeviceScreen();
  return (
    <Container vertical gap={15}>
      <div>{text}</div>
      <Container vertical={screen === 'iphone'} gap={5}>
        <ConfirmButton onClick={() => onClose(true)}>Ок</ConfirmButton>
        <CancelButton onClick={() => onClose(false)}>Отмена</CancelButton>
      </Container>
    </Container>
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
  ${({ theme }) => theme.screen === 'iphone' && css`
    height: 61px;
    width: 100%;
    background-color: ${color('secondary', theme)};
    color:  ${color('primary', theme)};
  `}
`;

const ConfirmButton = styled(Button)`
  ${({ theme }) => theme.screen === 'iphone' && css`
    height: 61px;
    width: 100%;
    background-color: ${color('primary', theme)};
    color:  ${color('basic', theme)};
  `}
`;
