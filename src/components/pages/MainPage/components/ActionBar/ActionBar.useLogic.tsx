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
  const screen = useDeviceScreen();

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
    tags,
    userOptionsRef,
    user,
    userOptionsOpen,
  };
};
