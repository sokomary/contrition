import React from 'react';
import { isAdmin, User } from 'src/types/domain';
import { useDeviceScreen, useRoutModal, useToggleModal } from 'src/hooks';
import { Button } from 'src/components/features';
import { CreateIcon, RandomIcon } from 'src/assets';
import * as css from './Actions.css';

type Props = {
  user?: User;
  onNewClick: () => void;
  onRandomClick: () => void;
};

export const Actions = (props: Props) => {
  const screen = useDeviceScreen();
  const { isOpen: isMenuOpen } = useRoutModal({ key: 'menu', value: 'true' });
  const { open: openMenu } = useToggleModal('menu', 'true');

  return (
    <div className={css.container}>
      {isAdmin(props.user) && (
        <Button className={css.button} onClick={props.onNewClick}>
          {screen === 'mac' ? (
            <div>Новый</div>
          ) : (
            <CreateIcon className={css.icon} />
          )}
        </Button>
      )}

      <Button
        className={css.button}
        kind="primary"
        onClick={props.onRandomClick}
      >
        {screen === 'mac' ? (
          <div>Случайный</div>
        ) : (
          <RandomIcon className={css.icon} />
        )}
      </Button>

      {!isMenuOpen && screen !== 'iphone' && (
        <Button className={css.button} kind="primary" onClick={openMenu}>
          <div>Mеню</div>
        </Button>
      )}
    </div>
  );
};
