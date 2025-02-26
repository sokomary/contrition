import React, { ReactNode } from 'react';
import { useDeviceScreen } from 'src/theme';
import {
  Button,
  ButtonKind,
  ButtonSize,
  ButtonType,
  Loading,
} from 'src/components/features/index';
import * as css from './ActionBar.css';

export type Action = {
  label: ReactNode;
  onClick?: () => void;
  kind?: ButtonKind;
  type?: ButtonType;
  display?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  size?: ButtonSize;
};

type Props = {
  actions: Action[];
  className?: string;
};

export const ActionBar = ({ actions, className }: Props) => {
  const screen = useDeviceScreen();

  return (
    <div className={`${css.container} ${className}`}>
      {actions
        .filter((action) => action.display !== false)
        .map((action, i) => (
          <Button
            key={i}
            size={screen === 'iphone' ? 'large' : 'regular'}
            {...action}
            label={
              action.isLoading ? (
                <Loading className={css.loader} />
              ) : (
                action.label
              )
            }
          />
        ))}
    </div>
  );
};
