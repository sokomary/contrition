import React from 'react';
import { isAdmin, User } from 'src/types/domain';
import { Action, ActionBar } from 'src/components/features';
import { CreateIcon, RandomIcon } from 'src/assets';
import { useDeviceScreen } from 'src/theme';
import { useRouteModal } from 'src/router';
import { useToggleModal } from 'src/components/modals';
import * as css from './Actions.css';

type Props = {
  user?: User;
};

export const Actions = ({ user }: Props) => {
  const screen = useDeviceScreen();
  const wideScreen = screen !== 'iphone';

  const { isOpen: isMenuOpen } = useRouteModal({ key: 'menu' });
  const { open: openMenu } = useToggleModal('menu', 'true');
  const { open: openRecipeNew } = useToggleModal('recipe-new', 'true');
  const { open: openRandom } = useToggleModal('random-recipe', 'true');

  const actions: Action[] = [
    {
      label: wideScreen ? 'Новый' : <CreateIcon className={css.icon} />,
      onClick: openRecipeNew,
      kind: 'primary',
      size: 'regular',
      display: isAdmin(user),
    },
    {
      label: wideScreen ? 'Случайный' : <RandomIcon className={css.icon} />,
      onClick: openRandom,
      kind: 'primary',
      size: 'regular',
    },
    {
      label: 'Меню',
      onClick: openMenu,
      kind: 'primary',
      size: 'regular',
      display: !isMenuOpen && wideScreen,
    },
  ];

  return <ActionBar className={css.container} actions={actions} />;
};
