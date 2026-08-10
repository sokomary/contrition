import React, { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionBar } from 'src/components/features';
import { Instruction } from './components/Instruction';
import { useLogic, Options } from './useLogic';
import * as css from './index.css';

export const InstructionsField = (props: Options) => {
  const { t } = useTranslation();
  const { fields, remove, actions } = useLogic(props);
  const titleId = useId();

  const renderContent = () => {
    if (!fields.length) {
      return (
        <p className={css.emptyState}>
          {t('startpage.recipes.instructions.empty')}
        </p>
      );
    }

    return (
      <ol className={css.content}>
        {fields.map((_, index) => (
          <li key={index}>
            <Instruction
              name={`instructions.${index}`}
              register={props.register}
              control={props.control}
              onRemove={() => remove(index)}
            />
          </li>
        ))}
      </ol>
    );
  };

  return (
    <section className={css.container} aria-labelledby={titleId}>
      <div className={css.header}>
        <h3 id={titleId}>{t('startpage.recipes.instructions.title')}</h3>
        <ActionBar actions={actions} />
      </div>

      {renderContent()}
    </section>
  );
};
