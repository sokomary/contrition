import { useState } from 'react';
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

  return {
    user,
    infoOpen,
    toggleInfoOpen: () => setInfoOpen(!infoOpen),
    recipes,
  };
};
