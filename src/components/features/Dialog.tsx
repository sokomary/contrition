import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';
import { IconClear } from 'src/assets';
import * as css from './Dialog.css';

type Options = PropsWithChildren & {
  isActive: boolean;
  header: ReactNode;
  onClose?: () => void;
  right?: boolean;
  size?: 'small' | 'medium' | 'large';
};

export const isPlainText = (node: ReactNode): boolean =>
  typeof node === 'string' || typeof node === 'number';

export const Dialog = (options: Options) => {
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();

  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(options.isActive);

  useEffect(() => {
    setModalRoot(document.getElementById('modals-root'));
  }, []);

  useEffect(() => {
    if (optionsRef.current.isActive) {
      setMounted(true);
    }
  }, [optionsRef.current.isActive]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (optionsRef.current.isActive && !dialog?.open) {
      dialogRef.current?.showModal();
      return;
    }

    if (!optionsRef.current.isActive && dialog?.open) {
      dialogRef.current?.close();
      return;
    }
  }, [optionsRef.current.isActive, modalRoot, mounted]);

  if (!modalRoot || !mounted) {
    return null;
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={headingId}
      onTransitionEnd={(e) => {
        if (!optionsRef.current.isActive && e.target === dialogRef.current) {
          setMounted(false);
        }
      }}
      className={css.dialog({
        right: !!optionsRef.current.right,
        size: optionsRef.current.size || 'medium',
      })}
    >
      <div className={css.container}>
        <div className={css.header}>
          <h2>{optionsRef.current.header}</h2>
          <Button
            kind='ghost'
            onClick={() => {
              dialogRef.current?.close();
              optionsRef.current.onClose?.();
            }}
            startGraphic={<IconClear />}
          />
        </div>

        <div className={css.content}>{optionsRef.current.children}</div>
      </div>
    </dialog>,
    document.getElementById('modals-root') as HTMLDivElement,
  );
};
