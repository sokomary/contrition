import { useLocation } from './useLocation';
import { useNavigate } from './useNavigate';
import { ModalRouts } from './routes';

type Key = keyof ModalRouts;

type RoutKey = {
  key: Key;
};

export const useRouteModal = ({ key }: RoutKey) => {
  const { search } = useLocation();
  const { navigate } = useNavigate();

  const value = search[key]?.[0];

  const onClose = () => {
    const newSearch: typeof search = {};

    Object.keys(search).forEach((k) => {
      if (k !== key) {
        newSearch[k] = search[k];
      }
    });

    return navigate({
      search: newSearch,
    });
  };

  return {
    isOpen: !!value,
    onClose,
    value,
  };
};
