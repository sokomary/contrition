import { useRef } from 'react';

/**
 * Returns ref that always contains value from latest rerender,
 */
export const useValueRef = <T>(value: T): { readonly current: T } => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};
