import React from 'react';
import { DropDownIcon, DropUpIcon } from 'src/assets';
import { Tag } from 'src/types/domain';
import { Button } from 'src/components/features';
import { Tags } from './components/Tags';
import { Search } from './components/Search';
import { UserOptions } from './components/UserOptions';
import { Actions } from './components/Actions';
import { useLogic } from './ActionBar.useLogic';
import * as css from './ActionBar.css';

type Props = {
  infoOpen: boolean;
  setInfoOpen: (value: boolean) => void;
  onTagChange: (newTag?: Tag) => void;
  onQueryChange: (newQuery: string) => void;
};

export const ActionBar = ({
  infoOpen,
  setInfoOpen,
  onTagChange,
  onQueryChange,
}: Props) => {
  const {
    tags,
    screen,
    toggleOptions,
    userOptionsRef,
    imageAlt,
    user,
    userOptionsOpen,
  } = useLogic();

  return (
    <div className={css.actionBar}>
      {tags && (
        <div className={css.actionBarContent}>
          <div className={css.filtersContainer}>
            <div className={css.infoControl}>
              {infoOpen ? (
                <DropUpIcon
                  className={css.icon}
                  onClick={() => setInfoOpen(!infoOpen)}
                />
              ) : (
                <DropDownIcon
                  className={css.icon}
                  onClick={() => setInfoOpen(!infoOpen)}
                />
              )}
            </div>
            <div className={css.filters}>
              <Tags tags={tags} onSelect={onTagChange} />
              {screen !== 'iphone' && <Search onQueryChange={onQueryChange} />}
            </div>
          </div>
          <div className={css.userBlock}>
            <Actions user={user} />
            <div className={css.content}>
              <div className={css.name}>{user?.name}</div>
              {screen === 'iphone' && <Search onQueryChange={onQueryChange} />}
              <div className={css.photo}>
                <div ref={userOptionsRef}>
                  <Button kind="ghost" onClick={toggleOptions}>
                    {user?.picture ? (
                      <img
                        className={css.circleImg}
                        src={user?.picture}
                        alt={imageAlt}
                      />
                    ) : (
                      <div className={css.circleImg}>{imageAlt}</div>
                    )}
                  </Button>
                  {userOptionsOpen && <UserOptions />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
