import { Button, ButtonProps } from './Button';
import { ReactNode, RefObject, useId } from 'react';
import * as css from './Callout.css';

type Props = {
  buttonProps: ButtonProps;
  content: ReactNode;
  calloutRef?: RefObject<HTMLDivElement | null>;
};

export const Callout = ({ buttonProps, calloutRef, content }: Props) => {
  const id = useId();

  return (
    <div className={css.container}>
      <Button
        {...buttonProps}
        popoverTarget={id}
        style={{ anchorName: `--open-button-${id}` }}
      />

      <div
        id={id}
        // oxlint-disable-next-line react/no-unknown-property
        popover='auto'
        ref={calloutRef}
        className={css.content}
        style={{ positionAnchor: `--open-button-${id}` }}
      >
        {content}
      </div>
    </div>
  );
};
