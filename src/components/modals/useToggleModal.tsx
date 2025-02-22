import { ModalRouts, useNavigate } from 'src/router';

type Key = keyof ModalRouts;
type Value<K extends Key> = Pick<ModalRouts, K>[K];

export const useToggleModal = <K extends Key>(key: K, value: Value<K>) => {
  const { navigate } = useNavigate();

  const open = () =>
    navigate({
      search: { [key]: [value] },
      keepPreviousSearch: true,
    });

  return { open };
};
