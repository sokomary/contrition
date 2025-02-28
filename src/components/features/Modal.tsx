import React, { PropsWithChildren, ReactNode, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { ClearIcon } from 'src/assets';
import { Button } from './Button';
import { useLogic } from './Modal.useLogic';
import * as css from './Modal.css';

export type DialogPosition = 'center' | 'bottom' | 'right' | 'top';

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
  const { isRendered, zIndex, modalRoot } = useLogic({ isActive, onClose });

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
