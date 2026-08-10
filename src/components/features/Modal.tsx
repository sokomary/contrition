import React, { PropsWithChildren, ReactNode, Suspense, useId } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { IconClear } from 'src/assets';
import { Button } from './Button';
import { isPlainText } from './Dialog';
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
  const { t } = useTranslation();
  const headingId = useId();
  const { isRendered, zIndex, modalRoot } = useLogic({ isActive, onClose });

  if (!isRendered || !modalRoot) {
    return null;
  }

  const renderContent = (overlay: boolean) => (
    <div className='modal'>
      {overlay && (
        <div className={css.overlay({ isActive })} style={{ zIndex }} />
      )}

      <Suspense fallback={<>{t('voc.loading')}</>}>
        <div
          className={css.content({ isActive, position, overlay })}
          style={{ zIndex: zIndex + 1 }}
        >
          <div
            role='dialog'
            aria-modal={overlay || undefined}
            aria-labelledby={headingId}
            style={{
              width:
                (position === 'center' || position === 'right') && width
                  ? width
                  : undefined,
            }}
            className={css.children({ position })}
          >
            <div className={css.header}>
              {isPlainText(header) ? (
                <h2 id={headingId}>{header}</h2>
              ) : (
                <div id={headingId}>{header}</div>
              )}
              <Button
                kind='ghost'
                startGraphic={<IconClear />}
                onClick={onClose}
              />
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
    document.getElementById('modals-root') as HTMLDivElement,
  );
};
