import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecipes, useAuthenticate } from 'src/api';
import { useDeviceScreen } from 'src/theme/useDeviceScreen';

export const useLogic = () => {
  const user = useAuthenticate();

  const { data: recipes } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(),
  });

  const screen = useDeviceScreen();

  const [infoOpen, setInfoOpen] = useState(screen === 'mac');
  const [userOptionsOpen, setUserOptionsOpen] = useState(false);

  const userOptionsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userOptionsRef.current &&
        !userOptionsRef.current.contains(event.target as Node)
      ) {
        setUserOptionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userOptionsRef]);

  return {
    imageAlt: user?.name.slice(0, 2).toUpperCase(),
    toggleOptions: () => setUserOptionsOpen(!userOptionsOpen),
    screen,
    userOptionsRef,
    user,
    userOptionsOpen,
    infoOpen,
    setInfoOpen,
    recipes,
  };
};
