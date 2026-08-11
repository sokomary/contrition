import { useRef } from 'react';
import { User } from 'src/types/domain';

export type Options = {
  user: User;
};

export const useLogic = ({ user }: Options) => {
  const calloutRef = useRef<HTMLDivElement>(null);

  const closeOptions = () => {
    const callout = calloutRef.current;
    if (callout?.matches(':popover-open')) {
      callout.hidePopover();
    }
  };

  return {
    calloutRef,
    closeOptions,
    imageAlt: user?.name.slice(0, 2).toUpperCase(),
  };
};
