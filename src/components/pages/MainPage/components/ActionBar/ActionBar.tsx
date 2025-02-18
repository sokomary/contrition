import React from 'react';
import { DropDownIcon, DropUpIcon } from 'src/assets';
import { Tag } from 'src/types/domain';
import { GetRandomRecipe } from 'src/components/modals';
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
  onNewClick: () => void;
};

export const ActionBar = ({
  infoOpen,
  setInfoOpen,
  onTagChange,
  onQueryChange,
  onNewClick,
}: Props) => {
  const {
    randomDialogOpen,
    setRandomDialogOpen,
    tags,
    screen,
    toggleOptions,
    menuRef,
    imageAlt,
    user,
    userOptionsOpen,
  } = useLogic();

  return (
    <>
      <GetRandomRecipe
        open={randomDialogOpen}
        onClose={() => setRandomDialogOpen(false)}
      />
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
                {screen !== 'iphone' && (
                  <Search onQueryChange={onQueryChange} />
                )}
              </div>
            </div>
            <div className={css.userBlock}>
              <Actions
                user={user}
                onRandomClick={() => setRandomDialogOpen(true)}
                onNewClick={onNewClick}
              />
              <div className={css.content}>
                <div className={css.name}>{user?.name}</div>
                {screen === 'iphone' && (
                  <Search onQueryChange={onQueryChange} />
                )}
                <div className={css.photo}>
                  <div ref={menuRef}>
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
    </>
  );
};
