import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { recipesApi, MAX_LIMIT, useAuthenticate } from 'src/api';
import { useDeviceScreen } from 'src/theme/useDeviceScreen';

export const useLogic = () => {
  const user = useAuthenticate();

  const { data: recipes } = useQuery({
    queryKey: ['recipes', 'favorite'],
    queryFn: () => recipesApi.getFavourites({ limit: MAX_LIMIT }),
    select: (data) => data.content,
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
