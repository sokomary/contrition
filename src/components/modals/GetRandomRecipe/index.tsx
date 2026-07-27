import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActionBar, Button, Dialog } from 'src/components/features';
import { useLogic } from './useLogic';
import * as css from './index.css';

export const GetRandomRecipe = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, data, actions, tags, isSelected, onSelect } =
    useLogic();

  return (
    <Dialog
      header={t('startpage.recipes.random.header')}
      isActive={isOpen}
      onClose={onClose}
      size='small'
    >
      <div className={css.container}>
        <div className={css.content}>
          {tags.map((tag, index) => (
            <Button
              kind='ghost'
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

      <ActionBar actions={actions} className={css.actions} />
    </Dialog>
  );
};
