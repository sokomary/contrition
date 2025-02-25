import React from 'react';
import { isAdmin } from 'src/types/domain';
import { useLogic } from './useLogic';
import { Details } from './components/Details';
import { Filters, FiltersProps } from './components/Filters';
import { ActionsProps, UserActions } from './components/UserActions';
import * as css from './index.css';

type Props = Omit<FiltersProps, 'infoOpen' | 'toggleInfoOpen'> &
  Omit<ActionsProps, 'user'>;

export const Header = (props: Props) => {
  const { user, infoOpen, toggleInfoOpen, recipes } = useLogic();

  return (
    <div className={css.actionBar}>
      <div className={css.container}>
        <div className={css.content}>
          <Filters
            {...props}
            infoOpen={infoOpen}
            toggleInfoOpen={toggleInfoOpen}
          />

          <UserActions user={user} />
        </div>
      </div>

      {isAdmin(user) && recipes && (
        <Details open={infoOpen} recipes={recipes} />
      )}
    </div>
  );
};
