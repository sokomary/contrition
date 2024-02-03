import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Dialog as OriginalDialog } from 'primereact/dialog';
import { color } from 'src/theme';

export const Dialog: FC<{
  visible: boolean; header: string; onClose: () => void; width?: number;
} & PropsWithChildren> = (props) => (
  <WideDialog
    width={props.width || 1120}
    headerStyle={{
      borderRadius: '20px 20px 0px 0px',
      backgroundColor: color('dialog-background'),
      color: color('font'),
    }}
    contentStyle={{ borderRadius: '0px 0px 20px 20px', backgroundColor: color('dialog-background') }}
    header={props.header}
    visible={props.visible}
    onHide={() => {
      props.onClose();
    }}
  >
    {props.children}
  </WideDialog>
);

const WideDialog = styled(OriginalDialog)<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  height: fit-content;
  
  @media (max-width: 1120px) {
    width: fit-content;
    max-height: 95%;
    overflow-y: auto;
  }
`;
