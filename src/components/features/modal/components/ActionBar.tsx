import React from 'react';
import { useDeviceScreen } from 'src/hooks';
import { Action } from '../Modal.types';
import { Button } from '../../Button';
import * as css from './ActionBar.css';
import { Loading } from '../../Loading';

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
            label={action.isLoading ? <Loading /> : action.label}
          />
        ))}
    </div>
  );
};
