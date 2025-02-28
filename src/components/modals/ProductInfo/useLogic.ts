import { useQuery } from '@tanstack/react-query';
import { useDeviceScreen } from 'src/theme';
import { useRouteModal } from 'src/router';
import { getProduct } from 'src/api';

export const useLogic = () => {
  const screen = useDeviceScreen();

  const { isOpen, value, onClose } = useRouteModal({
    key: 'product-info',
  });

  const id = parseInt(value, 10);

  const { data: product } = useQuery({
    queryKey: [`product-${id}`],
    queryFn: () => getProduct(id),
    enabled: !Number.isNaN(id),
  });
  return {
    screen,
    product,
    isOpen,
    onClose,
  };
};
