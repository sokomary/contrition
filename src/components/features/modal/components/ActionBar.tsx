import React from 'react';
import { useDeviceScreen } from 'src/hooks';
import { Action } from '../Modal.types';
import { Button } from '../../Button';
import * as css from './ActionBar.css';

type Props = {
  actions: Action[];
};

export const ActionBar = ({ actions }: Props) => {
  const screen = useDeviceScreen();
  return (
    <div className={css.container}>
      {actions.map((action, i) => (
        <Button key={i} size={screen === 'iphone' ? 'large' : 'regular'} {...action} />
      ))}
    </div>
  );
};
