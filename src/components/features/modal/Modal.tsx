import React, {
  PropsWithChildren,
  ReactNode,
  Suspense,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { ClearIcon } from 'src/assets';
import { useLogic } from './Modal.useLogic';
import { Button } from '../Button';
import { DialogPosition } from './Modal.types';
import * as css from './Modal.css';

type Props = PropsWithChildren & {
  isActive: boolean;
  header: ReactNode;
  onClose: () => void;
  width?: number;
  position?: DialogPosition;
  side?: boolean;
};

export const Modal = ({
  children,
  isActive,
  width,
  onClose,
  header,
  position = 'center',
  side,
}: Props) => {
  const { isRendered } = useLogic({ isActive, onClose });

  const zIndex = 101 + Date.now() / 100000000000;
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById('modals-root');
    setModalRoot(root);
  }, []);

  if (!isRendered || !modalRoot) {
    return null;
  }

  const renderContent = (overlay: boolean) => (
    <div className="modal">
      {overlay && (
        <div className={css.overlay({ isActive })} style={{ zIndex }} />
      )}

      <Suspense fallback={<>is loading</>}>
        <div
          className={css.content({ isActive, position, overlay })}
          style={{ zIndex: zIndex + 1 }}
        >
          <div
            style={{
              width:
                (position === 'center' || position === 'right') && width
                  ? width
                  : undefined,
            }}
            className={css.children({ position })}
          >
            <div className={css.header}>
              <div>{header}</div>
              <Button kind="ghost" onClick={onClose}>
                <ClearIcon />
              </Button>
            </div>
            {children}
          </div>
        </div>
      </Suspense>
    </div>
  );
  if (side) {
    return renderContent(false);
  }

  return createPortal(
    renderContent(true),
    document.getElementById('modals-root') as HTMLDivElement
  );
};
