import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { Recipe } from 'src/types/domain';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { Button } from 'src/components/features';
import { InstructionSteps } from './components/InstructionSteps';
import * as css from './index.css';

type Props = {
  control: Control<Recipe>;
  register: UseFormRegister<Recipe>;
};

export const InstructionsField = (props: Props) => {
  const { fields, append, remove } = useFieldArray({
    control: props.control,
    name: 'instructions',
  });

  const addInstruction = () => {
    append({
      id: undefined as unknown as number,
      name: '',
      steps: [],
    });
  };

  return (
    <div className={css.mainContainer}>
      <div className={css.header}>
        Приготовление
        <Button
          kind="ghost"
          className={css.addInstructionButton}
          onClick={addInstruction}
        >
          Добавить часть
        </Button>
      </div>
      <div className={css.contentContainer}>
        {fields.map((field, index) => (
          <InstructionSteps
            key={index}
            instruction={
              <TextareaAutosize
                className={css.instructionName}
                placeholder="Название"
                key={field.id}
                {...props.register(`instructions.${index}.name`)}
              />
            }
            onDeleteInstruction={() => remove(index)}
            instrIndex={index}
            register={props.register}
            control={props.control}
          />
        ))}
      </div>
    </div>
  );
};
