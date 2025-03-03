import { useQuery } from '@tanstack/react-query';
import { getKinds, getMenu } from 'src/api';
import { compare, now } from 'src/helpers/dates';
import { useMemo, useState } from 'react';
import { useRouteModal } from 'src/router';
import { useDeviceScreen } from 'src/theme';

type Mode = 'current' | 'new' | 'history';

export const useLogic = () => {
  const screen = useDeviceScreen();
  const { isOpen, onClose } = useRouteModal({
    key: 'menu',
  });

  const [mode, setMode] = useState<Mode>('current');

  const { data: menu, isLoading: isMenuLoading } = useQuery({
    queryKey: ['menu'],
    queryFn: () => getMenu(),
  });
  const { data: kinds, isLoading: isKindsLoading } = useQuery({
    queryKey: ['kinds'],
    queryFn: () => getKinds(),
  });

  const currentMenu = useMemo(
    () =>
      menu?.find((m) => {
        const currentDate = now();
        return (
          compare(m.dateStart, currentDate) < 1 &&
          compare(currentDate, m.dateEnd) < 1
        );
      }),
    [menu]
  );

  const wideScreen = screen !== 'iphone' && screen !== 'ipadv';

  return {
    wideScreen,
    isLoading: isMenuLoading || isKindsLoading,
    mode,
    screen,
    setMode,
    kinds: kinds || [],
    currentMenu,
    menu: currentMenu
      ? menu?.filter((m) => m.id !== currentMenu.id) || []
      : menu || [],
    isOpen,
    onClose,
    onSave: () => setMode('current'),
    onCancel: () => setMode('current'),
    actions: [
      {
        kind: 'primary' as const,
        label: 'Добавить меню',
        onClick: () => setMode('new'),
        display: wideScreen,
      },
    ],
  };
};
