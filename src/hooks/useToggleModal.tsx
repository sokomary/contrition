import { useNavigate } from './useNavigate';
import { ROUT_MODALS } from '../entry/components/Modals';

type RoutModals = typeof ROUT_MODALS;
type Key = keyof RoutModals;

export const useToggleModal = <K extends Key>(
  key: K,
  value: RoutModals[K][number],
) => {
  const { navigate } = useNavigate();

  const open = () => navigate({
    search: { [key]: [value] },
    keepPreviousSearch: true,
  });

  return { open };
};
