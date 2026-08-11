import React from 'react';
import { Callout } from 'src/components/features';
import { LanguageSwitcher } from 'src/components/atoms/LanguageSwitcher';
import { Options as UserOptions } from './components/Options';
import { useLogic, Options } from './useLogic';
import { Actions } from './components/Actions';
import * as css from './index.css';

export type ActionsProps = Options;

export const UserActions = ({ user }: ActionsProps) => {
  const { calloutRef, closeOptions, imageAlt } = useLogic({ user });

  return (
    <div className={css.container}>
      <Actions />

      <div className={css.content}>
        <LanguageSwitcher />

        <div className={css.name}>{user?.name}</div>
        <div className={css.photo}>
          <Callout
            calloutRef={calloutRef}
            buttonProps={{
              kind: 'ghost',
              children: (
                <img className={css.image} src={user?.picture} alt={imageAlt} />
              ),
            }}
            content={<UserOptions onAction={closeOptions} />}
          />
        </div>
      </div>
    </div>
  );
};
