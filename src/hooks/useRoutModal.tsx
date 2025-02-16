import { useLocation } from './useLocation';
import { useNavigate } from './useNavigate';
import { ROUT_MODALS } from '../entry/components/Modals';

type Key = keyof typeof ROUT_MODALS;
type Value = (typeof ROUT_MODALS)[Key][number];

type RoutKey = {
  key: Key;
  value: Value;
};

export const useRoutModal = ({ key, value }: RoutKey) => {
  const { search } = useLocation();
  const { navigate } = useNavigate();

  const isOpen = search[key]?.includes(value);

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
    isOpen,
    onClose,
  };
};
