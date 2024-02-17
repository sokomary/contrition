import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Dialog as OriginalDialog } from 'primereact/dialog';
import { color } from 'src/theme';
import { useSystemThemeMode } from 'src/hooks';

export const Dialog: FC<{
  visible: boolean; header: string; onClose: () => void; width?: number;
} & PropsWithChildren> = (props) => {
  const mode = useSystemThemeMode();
  const theme = { mode } as const;
  return (
    <WideDialog
      width={props.width || 1120}
      headerStyle={{
        borderRadius: '20px 20px 0px 0px',
        backgroundColor: color('basic', theme),
        color: color('font', theme),
      }}
      contentStyle={{ borderRadius: '0px 0px 20px 20px', backgroundColor: color('basic', theme) }}
      header={props.header}
      visible={props.visible}
      onHide={() => {
        props.onClose();
      }}
    >
      {props.children}
    </WideDialog>
  );
};

const WideDialog = styled(OriginalDialog)<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  height: fit-content;
  
  @media (max-width: 1120px) {
    width: fit-content;
    max-height: 95%;
    overflow-y: auto;
  }
`;
