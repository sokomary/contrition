import React from 'react';
import { ActionBar } from 'src/components/features';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-textarea-autosize';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { Recipe } from 'src/types/domain';
import { Step } from './components/Step';
import { Options, useLogic } from './useLogic';
import { textarea } from './components/Step.css';
import * as css from './index.css';

type Props = Options & {
  register: UseFormRegister<Recipe>;
};

export const Instruction = ({ register, ...props }: Props) => {
  const { t } = useTranslation();
  const { fields, actions, remove, name } = useLogic(props);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <TextareaAutosize
          className={textarea}
          placeholder={t('domain.recipe.name')}
          {...register(`${name}.name`)}
        />
        <ActionBar actions={[actions[0]]} />
      </div>

      <ol className={css.content}>
        {fields.map((_, index) => (
          <li key={index}>
            <Step
              index={index}
              name={`${name}.steps.${index}.description`}
              register={register}
              onRemove={() => remove(index)}
            />
          </li>
        ))}
      </ol>

      <ActionBar actions={[actions[1]]} />
    </div>
  );
};
