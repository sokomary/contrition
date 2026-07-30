import React, { useEffect, useRef } from 'react';
import {
  UseSuspenseInfiniteQueryResult,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { Loading } from 'src/components/features/Loading';
import { useValueRef } from './useValueRef';

export const useAppearObserver = <T,>(
  query:
    | UseSuspenseInfiniteQueryResult<T[], any>
    | UseInfiniteQueryResult<T[], any>,
) => {
  const constsRef = useValueRef(query);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const { fetchNextPage } = constsRef.current;
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          fetchNextPage();
          break;
        }
      },
      {
        root: findRoot(target),
        rootMargin: '200px',
      },
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, [constsRef]);

  return (
    <>
      <div ref={targetRef} />
      {constsRef.current.isFetchingNextPage && <Loading />}
    </>
  );
};

const findRoot = (element: HTMLElement | null) => {
  while (true) {
    element = element?.parentElement || null;
    if (!element) {
      break;
    }
    if (element.scrollHeight === element.clientHeight) {
      continue;
    }
    const style = window.getComputedStyle(element);
    if (style.overflowY !== 'visible') {
      break;
    }
  }
  return element || document;
};
