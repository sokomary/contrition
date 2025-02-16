import React from 'react';
import { Button, Loading, Modal } from 'src/components/features';
import { useLogic } from './Menu.useLogic';
import { CurrentMenu } from './components/CurrentMenu/CurrentMenu';
import { NewMenu } from './components/NewMenu/NewMenu';
import * as css from './Menu.css';
import { History } from './components/History/History';

export const Menu = () => {
  const {
    kinds,
    actions,
    isOpen,
    screen,
    mode,
    menu,
    setMode,
    onClose,
    onSave,
    onCancel,
    currentMenu,
    isLoading,
  } = useLogic();

  const renderContent = () => {
    if (isLoading) {
      return <Loading />;
    }
    switch (mode) {
      case 'current': {
        return (
          <CurrentMenu kinds={kinds} menu={currentMenu} actions={actions} />
        );
      }

      case 'new': {
        return <NewMenu kinds={kinds} onCancel={onCancel} onSave={onSave} />;
      }

      case 'history': {
        return <History menu={menu} />;
      }

      default: {
        return null;
      }
    }
  };

  return (
    <Modal
      side
      position={screen === 'iphone' ? 'bottom' : 'right'}
      width={screen !== 'iphone' ? 577 : undefined}
      header={
        <div className={css.header}>
          <div>
            <Button
              label="Меню"
              kind="ghost"
              onClick={() => setMode('current')}
            />
          </div>
          <div>|</div>
          <div>
            <Button
              label="История"
              kind="ghost"
              onClick={() => setMode('history')}
            />
          </div>
        </div>
      }
      isActive={isOpen}
      onClose={onClose}
    >
      <div className={css.content}>{renderContent()}</div>
    </Modal>
  );
};
