import React from 'react';
import { isAdmin, User } from 'src/types/domain';
import { Button } from 'src/components/features';
import { CreateIcon, RandomIcon } from 'src/assets';
import { useDeviceScreen } from 'src/theme';
import { useRouteModal } from 'src/router';
import { useToggleModal } from 'src/components/modals';
import * as css from './Actions.css';

type Props = {
  user?: User;
};

export const Actions = (props: Props) => {
  const screen = useDeviceScreen();

  const { isOpen: isMenuOpen } = useRouteModal({ key: 'menu' });
  const { open: openMenu } = useToggleModal('menu', 'true');

  const { open: openRecipeNew } = useToggleModal('recipe-new', 'true');

  const { open: openRandom } = useToggleModal('random-recipe', 'true');

  return (
    <div className={css.container}>
      {isAdmin(props.user) && (
        <Button className={css.button} onClick={openRecipeNew}>
          {screen === 'mac' ? (
            <div>Новый</div>
          ) : (
            <CreateIcon className={css.icon} />
          )}
        </Button>
      )}

      <Button className={css.button} kind="primary" onClick={openRandom}>
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
