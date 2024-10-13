import React, { FC } from 'react';
import { isAdmin, User } from 'src/domain';
import { useDeviceScreen } from 'src/hooks';
import { Button } from 'src/components/features';
import { CreateIcon, RandomIcon } from 'src/assets';
import * as css from './Actions.css';

export const Actions: FC<{ user?: User; onNewClick: () => void; onRandomClick: () => void }> = (props) => {
  const screen = useDeviceScreen();
  return (
    <div className={css.container}>
      {isAdmin(props.user) && (
        <Button className={css.button} onClick={props.onNewClick}>
          {screen === 'mac' ? <div>Новый</div> : <CreateIcon className={css.icon} /> }
        </Button>
      )}
      <Button className={css.button} kind="primary" onClick={props.onRandomClick}>
        {screen === 'mac' ? <div>Случайный</div> : <RandomIcon className={css.icon} />}
      </Button>
    </div>
  );
};
