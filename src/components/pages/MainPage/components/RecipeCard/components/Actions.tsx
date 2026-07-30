import React, { useRef } from 'react';
import { Recipe } from 'src/types/domain';
import { ActionBar, Callout } from 'src/components/features';
import { useRecipeActions } from 'src/components/atoms/useRecipeActions';
import * as css from './Actions.css';

type Props = {
  recipe: Recipe;
};

export const Actions = ({ recipe }: Props) => {
  const calloutRef = useRef<HTMLDivElement>(null);

  // Light dismiss covers outside clicks and Esc; this is only for closing
  // after an action succeeds. Deleting light-dismisses the popover when the
  // confirmation modal takes over, so it can already be closed by then.
  const closeCallout = () => {
    const callout = calloutRef.current;
    if (callout?.matches(':popover-open')) {
      callout.hidePopover();
    }
  };

  const actions = useRecipeActions({ recipe, onSuccess: closeCallout });

  return (
    <Callout
      calloutRef={calloutRef}
      buttonProps={{
        size: 'small',
        className: css.dots,
        children: (
          <>
            <div className={css.dot} />
            <div className={css.dot} />
            <div className={css.dot} />
          </>
        ),
      }}
      content={<ActionBar className={css.actions} actions={actions} />}
    />
  );
};
