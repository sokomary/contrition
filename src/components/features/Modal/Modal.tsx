import React, {
  PropsWithChildren, ReactNode, Suspense,
} from 'react';
import { createPortal } from 'react-dom';
import { ClearIcon } from 'src/assets';
import { useLogic } from './Modal.useLogic';
import { Button } from '../Button';
import * as css from './Modal.css';
import { DialogPosition } from './Modal.types';

type Props = PropsWithChildren & {
  isActive: boolean;
  header: ReactNode;
  onClose: () => void;
  width?: number;
  position?: DialogPosition;
};

export const Modal = ({
  children, isActive, width, onClose, header, position = 'center',
}: Props) => {
  const { isRendered } = useLogic({ isActive, onClose });

  const zIndex = 101 + Date.now();

  if (!isRendered) {
    return null;
  }

  return createPortal(
    <div className="modal">
      <div className={css.overlay({ isActive })} style={{ zIndex }} />

      <Suspense fallback={<>is loading</>}>
        <div className={css.content({ isActive, position })} style={{ zIndex: zIndex + 1 }}>
          <div
            style={{ width: ((position === 'center' || position === 'right') && width) ? width : undefined }}
            className={css.children({ position })}
          >
            <div className={css.header}>
              <div>{header}</div>
              <Button kind="ghost" onClick={onClose}><ClearIcon /></Button>
            </div>
            {children}
          </div>
        </div>
      </Suspense>
    </div>,
    document.getElementById('modals-root') as HTMLDivElement,
  );
};
