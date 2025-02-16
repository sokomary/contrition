import { Control, useFieldArray } from 'react-hook-form';
import { Button } from 'src/components/features';
import React, { ReactNode } from 'react';
import { Recipe } from 'src/types/domain';
import TextareaAutosize from 'react-textarea-autosize';
import * as css from './InstructionSteps.css';

type InstructionStepsProps = {
  instruction: ReactNode;
  onDeleteInstruction: () => void;
  instrIndex: number;
  register: any;
  control?: Control<Recipe>;
};

export const InstructionSteps = (props: InstructionStepsProps) => {
  const { fields, append, remove } = useFieldArray({
    control: props.control,
    name: `instructions.${props.instrIndex}.steps`,
  });
  const addStep = () =>
    append({ id: undefined as unknown as number, description: '' });
  return (
    <div className={css.container}>
      <div className={css.instructionHeader}>
        {props.instruction}
        <Button kind="ghost" onClick={props.onDeleteInstruction}>
          удалить
        </Button>
      </div>
      <div className={css.steps}>
        {fields.map((field, index) => (
          <div className={css.stepContainer} key={index}>
            <div className={css.step}>
              <div className={css.stepNumber}>{index + 1}.</div>
              <TextareaAutosize
                className={css.styledInput}
                placeholder="Описание"
                key={field.id}
                {...props.register(
                  `instructions.${props.instrIndex}.steps.${index}.description`
                )}
              />
            </div>
            <Button kind="ghost" onClick={() => remove(index)}>
              удалить
            </Button>
          </div>
        ))}
        <Button kind="ghost" className={css.addStepButton} onClick={addStep}>
          Добавить шаг
        </Button>
      </div>
    </div>
  );
};
