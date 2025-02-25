import React from 'react';
import { Button, Loading, Modal } from 'src/components/features';
import { useLogic } from './Menu.useLogic';
import { CurrentMenu } from './components/CurrentMenu/CurrentMenu';
import { NewMenu } from './components/NewMenu/NewMenu';
import { History } from './components/History/History';
import * as css from './Menu.css';

export const SIDE_MODAL_WIDTH = 577;

export const Menu = () => {
  const {
    kinds,
    actions,
    isOpen,
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
      position="right"
      width={SIDE_MODAL_WIDTH}
      header={
        <div className={css.header}>
          <Button
            label="Меню"
            kind="ghost"
            onClick={() => setMode('current')}
          />
          <div>|</div>
          <Button
            label="История"
            kind="ghost"
            onClick={() => setMode('history')}
          />
        </div>
      }
      isActive={isOpen}
      onClose={onClose}
    >
      <div className={css.content}>{renderContent()}</div>
    </Modal>
  );
};
