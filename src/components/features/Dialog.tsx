import React, {
  CSSProperties, PropsWithChildren, ReactNode,
} from 'react';
import styled, { css } from 'styled-components';
import { Dialog as OriginalDialog } from 'primereact/dialog';
import { color } from 'src/theme';
import { useSystemThemeMode, useDeviceScreen } from 'src/hooks';

export type DialogPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

type Props = PropsWithChildren & {
  visible: boolean;
  header: ReactNode;
  onClose: () => void;
  width?: number;
  className?: string;
  style?: CSSProperties;
  position?: DialogPosition;
};

export const Dialog = (props: Props) => {
  const mode = useSystemThemeMode();
  const screen = useDeviceScreen();

  const basicStyle = {
    backgroundColor: color('basic', { mode }),
    color: color('font', { mode }),
    padding: screen !== 'mac' ? '15px' : undefined,
    WebkitScrollbar: {
      backgroundColor: 'transparent',
    },
  };

  const HEADER_STYLES: { [key: string]: CSSProperties } = {
    bottom: { borderRadius: '20px 20px 0px 0px', ...basicStyle },
    right: { borderRadius: '20px 0px 0px 0px', ...basicStyle },
    top: { borderRadius: '0px', ...basicStyle },
    left: { borderRadius: '20px 20px 0px 0px', ...basicStyle },
  };

  const CONTENT_STYLES: { [key: string]: CSSProperties } = {
    bottom: { borderRadius: '0px', ...basicStyle },
    right: { borderRadius: '0px 0px 0px 20px', ...basicStyle },
    top: { borderRadius: '0px 0px 20px 20px', ...basicStyle },
    left: { borderRadius: '0px 0px 20px 20px', ...basicStyle },
  };

  return (
    <WideDialog
      position={props.position}
      className={props.className}
      style={props.style}
      width={props.width || 1120}
      headerStyle={HEADER_STYLES[props.position || 'left']}
      contentStyle={CONTENT_STYLES[props.position || 'left']}
      header={props.header}
      visible={props.visible}
      onHide={props.onClose}
    >
      {props.children}
    </WideDialog>
  );
};

const WideDialog = styled(OriginalDialog)<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  margin: 0 !important;
  max-height: 100%;
  ${({ theme }) => ['ipadv'].includes(theme.screen) && css`
    max-height: 73%;
  `};
  ${({ theme }) => ['iphone'].includes(theme.screen) && css`
    max-height: 85%;
  `};
`;
