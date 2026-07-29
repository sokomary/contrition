import React from 'react';
import { useTranslation } from 'react-i18next';
import { Action, ActionBar } from 'src/components/features';
import { CreateIcon, RandomIcon } from 'src/assets';
import { useDeviceScreen } from 'src/theme';
import { useRouteModal } from 'src/router';
import { useToggleModal } from 'src/components/modals';
import * as css from './Actions.css';

export const Actions = () => {
  const { t } = useTranslation();
  const screen = useDeviceScreen();
  const wideScreen = screen !== 'iphone' && screen !== 'ipadv';

  const { isOpen: isMenuOpen } = useRouteModal({ key: 'menu' });
  const { open: openMenu } = useToggleModal('menu', 'true');
  const { open: openRecipeNew } = useToggleModal('recipe-new', 'true');
  const { open: openRandom } = useToggleModal('random-recipe', 'true');

  const actions: Action[] = [
    {
      label: wideScreen ? t('voc.new') : <CreateIcon className={css.icon} />,
      onClick: openRecipeNew,
      kind: 'primary',
      size: 'regular',
    },
    {
      label: wideScreen ? t('voc.random') : <RandomIcon className={css.icon} />,
      onClick: openRandom,
      kind: 'primary',
      size: 'regular',
    },
    {
      label: t('startpage.menu.title'),
      onClick: openMenu,
      kind: 'primary',
      size: 'regular',
      display: !isMenuOpen,
    },
  ];

  return <ActionBar actions={actions} />;
};
