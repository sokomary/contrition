import { useEffect, useRef, useState } from 'react';
import { User } from 'src/types/domain';

export type Options = {
  user: User;
};

export const useLogic = ({ user }: Options) => {
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
    userOptionsRef,
    userOptionsOpen,
    toggleOptions: () => setUserOptionsOpen(!userOptionsOpen),
    imageAlt: user?.name.slice(0, 2).toUpperCase(),
  };
};
