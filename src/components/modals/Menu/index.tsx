import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Loading, Modal } from 'src/components/features';
import { useLogic } from './useLogic';
import { CurrentMenu } from './components/CurrentMenu';
import { NewMenu } from './components/NewMenu';
import { History } from './components/History';
import * as css from './index.css';

export const SIDE_MODAL_WIDTH = 577;

export const Menu = () => {
  const { t } = useTranslation();
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
    wideScreen,
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
      side={wideScreen}
      position={wideScreen ? 'right' : 'bottom'}
      width={wideScreen ? SIDE_MODAL_WIDTH : undefined}
      header={
        <div className={css.header}>
          <Button
            label={t('startpage.menu.title')}
            kind='ghost'
            onClick={() => setMode('current')}
          />
          <div>|</div>
          <Button
            label={t('startpage.menu.history.title')}
            kind='ghost'
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
