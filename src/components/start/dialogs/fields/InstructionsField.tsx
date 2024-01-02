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
      <ContentContainer vertical gap={30}>
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
      </ContentContainer>
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
      </Container>
      <Container vertical gap={3}>
        {fields.map((field, index) => (
          <Container key={index}>
            <Container gap={1}>
              <StepNumber>
                {index + 1}
                .
              </StepNumber>
              <StyledInput
                key={field.id}
                {...register(`instructions.${instrIndex}.steps.${index}.description`)}
              />
            </Container>
            <GhostButton onClick={() => remove(index)}>удалить</GhostButton>
          </Container>
        ))}
        <AddStepButton onClick={addStep}>Добавить шаг</AddStepButton>
      </Container>
    </Container>
  );
};

const Header = styled(Container)`
  width: 100%;
  font-size: 17px;
  color: ${color('font')};
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
`;

const GhostButton = styled(AddInstructionButton)`
  font-size: 14px;
  flex-shrink: 0;
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
  color: ${color('primary')};
  margin-left: -2px;
`;

const MainContainer = styled(Container)`
  max-height: 428px;
  margin-left: 20px;
  width: 30%;
  padding: 0 10px;
  @media (max-width: 1120px) {
    width: 340px;
    margin-left: 0;
    max-height: fit-content;
  }
`;

const StepNumber = styled.div`
  color: ${color('font')};
  margin-top: 2px;
`;

const ContentContainer = styled(Container)`
  background: ${color('background')};
  box-shadow: 0 0 15px 5px rgba(8, 8, 8, 0.07);
  min-height: 34px;
  border-radius: 10px;
  padding: 15px;
  overflow-y: auto;
`;

export { InstructionsField };
