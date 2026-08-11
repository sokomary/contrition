import { Button, ButtonProps } from './Button';
import { ReactNode, RefObject, useId } from 'react';
import * as css from './Callout.css';

type Props = {
  buttonProps: ButtonProps;
  content: ReactNode;
  calloutRef?: RefObject<HTMLDivElement | null>;
  width?: 'fit' | 'full';
};

export const Callout = ({ buttonProps, calloutRef, content, width }: Props) => {
  const id = useId();

  return (
    <div className={css.container({ width })}>
      <Button
        {...buttonProps}
        popoverTarget={id}
        style={{ anchorName: `--open-button-${id}` }}
      />

      <div
        id={id}
        popover='auto'
        ref={calloutRef}
        className={css.content({ width })}
        style={{ positionAnchor: `--open-button-${id}` }}
      >
        {content}
      </div>
    </div>
  );
};
