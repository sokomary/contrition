import React from 'react';
import { ActionBar } from 'src/components/features';
import { Instruction } from './components/Instruction';
import { useLogic, Options } from './useLogic';
import * as css from './index.css';

export const InstructionsField = (props: Options) => {
  const { fields, remove, actions } = useLogic(props);

  const renderContent = () => {
    if (!fields.length) {
      return <div className={css.emptyState}>Приготовление не описано</div>;
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
        Приготовление
        <ActionBar className={css.actions} actions={actions} />
      </div>

      {renderContent()}
    </div>
  );
};
