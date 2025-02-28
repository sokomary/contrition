import React from 'react';
import { ActionBar, Button, Modal } from 'src/components/features';
import i18next from 'src/formatter';
import { useLogic } from './useLogic';
import * as css from './index.css';

export const GetRandomRecipe = () => {
  const { screen, isOpen, onClose, data, actions, tags, isSelected, onSelect } =
    useLogic();

  return (
    <Modal
      position={screen === 'iphone' ? 'bottom' : undefined}
      width={screen !== 'iphone' ? 350 : undefined}
      header={i18next.t('startpage:recipes.random.header')}
      isActive={isOpen}
      onClose={onClose}
    >
      <div className={css.container}>
        <div className={css.content}>
          {tags.map((tag, index) => (
            <Button
              kind="ghost"
              className={css.tag({ selected: isSelected(tag) })}
              key={index}
              onClick={() => onSelect(tag)}
            >
              {tag.name}
            </Button>
          ))}
        </div>

        <div className={css.name}>{data?.name}</div>
      </div>

      <ActionBar actions={actions} />
    </Modal>
  );
};
