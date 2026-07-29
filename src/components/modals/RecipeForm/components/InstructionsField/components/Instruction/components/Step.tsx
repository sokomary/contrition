import { Action, ActionBar } from 'src/components/features';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-textarea-autosize';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { Recipe } from 'src/types/domain';
import * as css from './Step.css';

type Props = {
  name: `instructions.${number}.steps.${number}.description`;
  register: UseFormRegister<Recipe>;
  onRemove: () => void;
  index: number;
};

export const Step = ({ index, onRemove, register, name }: Props) => {
  const { t } = useTranslation();

  const actions: Action[] = [
    {
      kind: 'ghost',
      label: t('startpage.recipes.actions.delete'),
      onClick: onRemove,
      size: 'small',
    },
  ];

  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.number}>{index + 1}.</div>

        <TextareaAutosize
          className={css.textarea}
          placeholder={t('voc.description')}
          {...register(name)}
        />
      </div>

      <ActionBar actions={actions} />
    </div>
  );
};
