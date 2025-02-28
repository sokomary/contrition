import { useRef, useState, useEffect } from 'react';

type Options = {
  isActive: boolean;
  onClose?: () => void;
};

export const useLogic = (options: Options) => {
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const [isRendered, setIsRendered] = useState(options.isActive);

  useEffect(() => {
    if (!options.isActive) {
      const timeout = setTimeout(() => setIsRendered(false), 300);
      return () => {
        clearTimeout(timeout);
      };
    }

    setIsRendered(true);
    return undefined;
  }, [options.isActive]);

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (!optionsRef.current.isActive || e.code !== 'Escape') {
        return;
      }

      optionsRef.current.onClose?.();
    };

    document.addEventListener('keydown', keydown);
    return () => document.removeEventListener('keydown', keydown);
  }, []);

  const zIndex = 101 + Date.now() / 100000000000;
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById('modals-root');
    setModalRoot(root);
  }, []);

  return {
    isRendered,
    zIndex,
    modalRoot,
  };
};
