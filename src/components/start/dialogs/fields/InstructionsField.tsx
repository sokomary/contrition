import React, {
  FC, ReactNode,
} from 'react';
import {
  Control, useFieldArray,
} from 'react-hook-form';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { Recipe } from '../../../../domain/Recipe';
import { Container } from '../../../ui/Container';
import { color } from '../../../ui/theme';

const InstructionsField: FC<{ control: Control<Recipe>; register: any }> = (props) => {
  const {
    fields, append, remove,
  } = useFieldArray({
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
    <MainContainer vertical gap={10}>
      <Header>
        Приготовление
        <AddInstructionButton onClick={addInstruction}>Добавить часть</AddInstructionButton>
      </Header>
      <Container vertical gap={30}>
        {fields.map((field, index) => (
          <InstructionSteps
            key={index}
            instruction={(
              <InstructionName
                key={field.id}
                {...props.register(`instructions.${index}.name`)}
              />
            )}
            onDeleteInstruction={() => remove(index)}
            instrIndex={index}
            register={props.register}
            control={props.control}
          />
        ))}
      </Container>
    </MainContainer>
  );
};

const InstructionSteps: FC<{
  instruction: ReactNode;
  onDeleteInstruction: () => void;
  instrIndex: number;
  register: any;
  control: Control<Recipe>;
}> = ({
  instruction, register, onDeleteInstruction, instrIndex, control,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `instructions.${instrIndex}.steps`,
  });

  const addStep = () => append({ id: undefined as unknown as number, description: '' });

  return (
    <Container vertical gap={5}>
      <Container vertical gap={1}>
        <InstructionHeader>
          {instruction}
          <GhostButton onClick={onDeleteInstruction}>удалить</GhostButton>
        </InstructionHeader>
        <AddStepButton onClick={addStep}>Добавить шаг</AddStepButton>
      </Container>
      <Container vertical gap={3}>
        {fields.map((field, index) => (
          <Container key={index}>
            <StepNumber>
              {index + 1}
              .
              {' '}
            </StepNumber>
            <StyledInput
              key={field.id}
              {...register(`instructions.${instrIndex}.steps.${index}.description`)}
            />
            <DeleteStepButton onClick={() => remove(index)}>удалить</DeleteStepButton>
          </Container>
        ))}
      </Container>
    </Container>
  );
};

const Header = styled(Container)`
  width: 100%;
  font-weight: bolder;
`;

const AddInstructionButton = styled.div`
  cursor: pointer;
  color: ${color('accent')};
  font-size: 14px;
  align-self: center;
  font-weight: normal;
`;

const AddStepButton = styled(AddInstructionButton)`
  font-size: 14px;
  flex-shrink: 0;
  align-self: flex-start;
  margin-left: 2px;
`;

const GhostButton = styled(AddInstructionButton)`
  font-size: 14px;
  flex-shrink: 0;
`;

const DeleteStepButton = styled(GhostButton)`
  align-self: flex-start;
  margin-top: 3px;
`;

const InstructionHeader = styled(Container)`
  align-items: flex-start;
  font-size: 15px;
`;

const StyledInput = styled(TextareaAutosize)<{ accent?: boolean }>`
  outline: none;
  border: none;
  color: ${color('font')};
  resize: none;
  background-color: ${color('background')};
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  
  &:focus {
    border: solid 1px ${color('label')};
    border-radius: 5px;
  }
`;

const InstructionName = styled(StyledInput)`
  max-width: 110px;
  color: ${color('primary')};
`;

const MainContainer = styled(Container)`
  width: calc(100% - 20px);
  overflow-y: auto;
  max-height: 458px;
  border-radius: 15px;
  background: ${color('background')};
  box-shadow: 0 0 15px 5px rgba(8, 8, 8, 0.07);
  padding: 15px;
  margin: 0 10px;
  
  @media (min-width: 890px) {
    width: calc(100% - 40px);
    height: calc(100% - 20px);
    margin: 20px;
  }
  
  @media (max-width: 1120px) {
    max-height: fit-content;
  }
`;

const StepNumber = styled.div`
  color: ${color('font')};
  margin-top: 2px;
`;

export { InstructionsField };
