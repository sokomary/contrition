import React, { Suspense } from 'react';
import { DropDownIcon, DropUpIcon } from 'src/assets';
import { isAdmin, Tag } from 'src/types/domain';
import { Button } from 'src/components/features';
import { Tags } from './components/Tags';
import { Search } from './components/Search';
import { UserOptions } from './components/UserOptions';
import { Actions } from './components/Actions';
import { useLogic } from './ActionBar.useLogic';
import { RecipesInfo } from '../RecipesInfo';
import * as css from './ActionBar.css';
import { actionBar } from './ActionBar.css';

type Props = {
  selectedTags: Tag[];
  onTagSelect: (tag: Tag) => void;
  query: string;
  onQueryChange: (newQuery: string) => void;
};

export const ActionBar = ({
  selectedTags,
  onTagSelect,
  query,
  onQueryChange,
}: Props) => {
  const {
    screen,
    toggleOptions,
    userOptionsRef,
    imageAlt,
    user,
    userOptionsOpen,
    infoOpen,
    setInfoOpen,
    recipes,
  } = useLogic();

  return (
    <div className={css.actionBar}>
      <div className={css.container}>
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
              <Tags value={selectedTags} onChange={onTagSelect} />
              {screen !== 'iphone' && (
                <Search value={query} onChange={onQueryChange} />
              )}
            </div>
          </div>
          <div className={css.userBlock}>
            <Actions user={user} />
            <div className={css.content}>
              <div className={css.name}>{user?.name}</div>
              {screen === 'iphone' && (
                <Search value={query} onChange={onQueryChange} />
              )}
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
      </div>

      {isAdmin(user) && recipes && (
        <Suspense>
          <RecipesInfo open={infoOpen} recipes={recipes} />
        </Suspense>
      )}
    </div>
  );
};
