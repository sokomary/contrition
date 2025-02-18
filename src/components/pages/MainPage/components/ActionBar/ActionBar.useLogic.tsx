import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTags } from 'src/api';
import { useAuthenticate } from 'src/hooks';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';

export const useLogic = () => {
  const user = useAuthenticate();
  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getTags(),
  });

  const [userOptionsOpen, setUserOptionsOpen] = useState(false);
  const [randomDialogOpen, setRandomDialogOpen] = useState(false);
  const screen = useDeviceScreen();

  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserOptionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return {
    imageAlt: user?.name.slice(0, 2).toUpperCase(),
    toggleOptions: () => setUserOptionsOpen(!userOptionsOpen),
    randomDialogOpen,
    setRandomDialogOpen,
    screen,
    tags,
    menuRef,
    user,
    userOptionsOpen,
  };
};
