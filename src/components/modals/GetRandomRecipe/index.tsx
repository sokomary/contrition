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
        <ul className={css.content}>
          {tags.map((tag, index) => (
            <li key={index}>
              <Button
                kind='ghost'
                className={css.tag({ selected: isSelected(tag) })}
                aria-pressed={isSelected(tag)}
                onClick={() => onSelect(tag)}
              >
                {tag.name}
              </Button>
            </li>
          ))}
        </ul>

        <p className={css.name}>{data?.name}</p>
      </div>

      <ActionBar actions={actions} className={css.actions} />
    </Dialog>
  );
};
