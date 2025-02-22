import { atom, useAtom } from 'jotai';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Action } from 'src/components/features';

export type Payload = {
  title: string;
  description: string;
  confirm: Action;
  onClose?: () => void;
};

const confirmationAtom = atom({
  isOn: false,
  payload: undefined as unknown as Payload,
});

export const useConfirmationToggle = () => {
  const [state, setState] = useAtom(confirmationAtom);

  const actions = useMemo(
    () => ({
      open: (payload: Payload) => setState({ isOn: true, payload }),
      close: () => setState((prev) => ({ ...prev, isOn: false })),
    }),
    [setState]
  );

  return {
    ...state,
    ...actions,
  };
};

export const useConfirmation = (options: Payload) => {
  const [isCurrentOn, setIsCurrentOn] = useState(false);

  const { isOn, open, close } = useConfirmationToggle();
  const localOptions = {
    ...options,
    isOn,
  };
  const optionsRef = useRef(localOptions);
  optionsRef.current = localOptions;

  const handleOpen = useCallback(() => {
    const opts = optionsRef.current;
    setIsCurrentOn(true);
    open({
      ...opts,
      confirm: {
        ...opts.confirm,
        onClick: optionsRef.current.confirm.onClick,
      },
    });
  }, [open]);

  useEffect(() => {
    if (!isOn) {
      setIsCurrentOn(false);
      optionsRef.current.onClose?.();
    }
  }, [isOn]);

  useEffect(() => {
    if (isCurrentOn && optionsRef.current.isOn) {
      handleOpen();
    }
  }, [
    isCurrentOn,
    handleOpen,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    options.title.toString(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    options.description.toString(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    options.confirm.kind,
    options.confirm.isLoading,
  ]);

  return {
    open: handleOpen,
    close,
  };
};
