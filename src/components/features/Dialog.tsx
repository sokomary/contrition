import React, {
  CSSProperties, FC, PropsWithChildren, ReactNode,
} from 'react';
import styled, { css } from 'styled-components';
import { Dialog as OriginalDialog } from 'primereact/dialog';
import { color } from 'src/theme';
import { useSystemThemeMode, useDeviceScreen } from 'src/hooks';

type DialogPosition =
  'center' | 'top'
  | 'bottom' | 'left'
  | 'right' | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export const Dialog: FC<{
  visible: boolean;
  header: ReactNode;
  onClose: () => void;
  width?: number;
  className?: string;
  style?: CSSProperties;
  position?: DialogPosition;
} & PropsWithChildren> = (props) => {
  const mode = useSystemThemeMode();
  const theme = { mode } as const;
  const screen = useDeviceScreen();

  const basicContentStyle = {
    backgroundColor: color('basic', theme),
    color: color('font', theme),
    padding: screen !== 'mac' ? 15 : undefined,
    WebkitScrollbar: {
      backgroundColor: 'transparent',
    },
  };

  const getHeaderStyle = () => {
    if (props.position === 'bottom') {
      return { borderRadius: '20px 20px 0px 0px', ...basicContentStyle };
    }
    if (props.position === 'right') {
      return { borderRadius: '20px 0px 0px 0px', ...basicContentStyle };
    }
    if (props.position === 'top') {
      return { borderRadius: '0px', ...basicContentStyle };
    }
    return { borderRadius: '20px 20px 0px 0px', ...basicContentStyle };
  };

  const getContentStyle = () => {
    if (props.position === 'bottom') {
      return { borderRadius: '0px', ...basicContentStyle };
    }
    if (props.position === 'right') {
      return { borderRadius: '0px 0px 0px 20px', ...basicContentStyle };
    }
    return { borderRadius: '0px 0px 20px 20px', ...basicContentStyle };
  };

  return (
    <WideDialog
      position={props.position}
      className={props.className}
      style={props.style}
      width={props.width || 1120}
      headerStyle={getHeaderStyle()}
      contentStyle={getContentStyle()}
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
  margin: 0 !important;
  max-height: 100%;

  ${({ theme }) => ['ipadv'].includes(theme.screen) && css`
    max-height: 73%;
  `};
  ${({ theme }) => ['iphone'].includes(theme.screen) && css`
    max-height: 85%;
  `};
`;
