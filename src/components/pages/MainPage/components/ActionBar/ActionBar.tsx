import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getTags } from 'src/api';
import {
  DropDownIcon, DropUpIcon,
} from 'src/assets';
import { useAuthenticate } from 'src/hooks';
import { Tag } from 'src/domain';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';
import { GetRandomRecipe } from 'src/components/modals';
import { Button } from 'src/components/features';
import { Tags } from './components/Tags';
import { Search } from './components/Search';
import { UserOptions } from './components/UserOptions';
import { Actions } from './components/Actions';
import * as css from './ActionBar.css';

type Props = {
  infoOpen: boolean;
  setInfoOpen: (value: boolean) => void;
  onTagChange: (newTag?: Tag) => void;
  onQueryChange: (newQuery: string) => void;
  onNewClick: () => void;
};

export const ActionBar = ({
  infoOpen, setInfoOpen, onTagChange, onQueryChange, onNewClick,
}: Props) => {
  const user = useAuthenticate();
  const { data: tags } = useQuery('tags', () => getTags());
  const [userOptionsOpen, setUserOptionsOpen] = useState(false);
  const [randomDialogOpen, setRandomDialogOpen] = useState(false);
  const screen = useDeviceScreen();

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setUserOptionsOpen(!userOptionsOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserOptionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

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
                {infoOpen
                  ? <DropUpIcon className={css.icon} onClick={() => setInfoOpen(!infoOpen)} />
                  : <DropDownIcon className={css.icon} onClick={() => setInfoOpen(!infoOpen)} />}
              </div>
              <div className={css.filters}>
                <Tags tags={tags} onSelect={onTagChange} />
                {screen !== 'iphone' && <Search onQueryChange={onQueryChange} />}
              </div>
            </div>
            <div className={css.userBlock}>
              <Actions
                user={user}
                onRandomClick={() => setRandomDialogOpen(true)}
                onNewClick={onNewClick}
              />
              <div className={css.content}>
                {(screen === 'mac' || screen === 'ipadh') && <div className={css.name}>{user?.name}</div>}
                {screen === 'iphone' && <Search onQueryChange={onQueryChange} />}
                <div className={css.photo}>
                  <div ref={menuRef}>
                    <Button kind="ghost" onClick={toggleMenu}>
                      <img className={css.circleImg} src={user?.picture} alt={user?.email.slice(0, 2).toUpperCase()} />
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
