import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActionBar } from 'src/components/features';
import { Instruction } from './components/Instruction';
import { useLogic, Options } from './useLogic';
import * as css from './index.css';

export const InstructionsField = (props: Options) => {
  const { t } = useTranslation();
  const { fields, remove, actions } = useLogic(props);

  const renderContent = () => {
    if (!fields.length) {
      return (
        <div className={css.emptyState}>
          {t('startpage.recipes.instructions.empty')}
        </div>
      );
    }

    return (
      <div className={css.content}>
        {fields.map((_, index) => (
          <Instruction
            key={index}
            name={`instructions.${index}`}
            register={props.register}
            control={props.control}
            onRemove={() => remove(index)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        {t('startpage.recipes.instructions.title')}
        <ActionBar actions={actions} />
      </div>

      {renderContent()}
    </div>
  );
};
