import { useDeviceScreen } from 'src/theme/useDeviceScreen';
import { useRouteModal } from 'src/router';
import { useQuery } from '@tanstack/react-query';
import { getRecipe } from 'src/api';

export const useLogic = () => {
  const screen = useDeviceScreen();

  const { isOpen, value, onClose } = useRouteModal({
    key: 'recipe-info',
  });

  const id = parseInt(value, 10);

  const { data: recipe, isLoading } = useQuery({
    queryKey: [`recipe-${id}`],
    queryFn: () => getRecipe(id),
    enabled: !Number.isNaN(id),
  });

  return {
    screen,
    isLoading,
    onClose,
    isOpen,
    recipe,
  };
};

export const WIDTHS: { [key: string]: number } = {
  mac: 500,
  ipadh: 500,
};
