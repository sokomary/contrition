import React from 'react';
import styled, { css } from 'styled-components';
import { useDeviceScreen } from 'src/hooks';
import { Button, Container } from 'src/components/features';
import { color } from 'src/theme';

export const Content = ({ text, onClose }: { text?: string; onClose: (res: boolean) => void }) => {
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
