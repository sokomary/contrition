import { Control, useFieldArray } from 'react-hook-form';
import { Container } from 'src/components/features';
import React, { ReactNode } from 'react';
import { Recipe } from 'src/domain';
import styled, { css } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { color } from 'src/theme';

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
  const addStep = () => append({ id: undefined as unknown as number, description: '' });
  return (
    <Container vertical gap={5}>
      <Container vertical gap={1}>
        <InstructionHeader>
          {props.instruction}
          <GhostButton onClick={props.onDeleteInstruction}>удалить</GhostButton>
        </InstructionHeader>
      </Container>
      <Container vertical gap={3}>
        {fields.map((field, index) => (
          <StepContainer key={index}>
            <Container gap={1}>
              <StepNumber>
                {index + 1}
                .
              </StepNumber>
              <StyledInput
                placeholder="Описание"
                key={field.id}
                {...props.register(`instructions.${props.instrIndex}.steps.${index}.description`)}
              />
            </Container>
            <GhostButton onClick={() => remove(index)}>удалить</GhostButton>
          </StepContainer>
        ))}
        <AddStepButton onClick={addStep}>Добавить шаг</AddStepButton>
      </Container>
    </Container>
  );
};

// todo fix copying
const AddInstructionButton = styled.div`
  cursor: pointer;
  color: ${({ theme }) => color('primary', theme)};
  font-size: 16px;
  font-weight: normal;
  align-self: flex-start;
`;

const AddStepButton = styled(AddInstructionButton)`
  font-size: 16px;
  flex-shrink: 0;
  align-self: flex-start;
`;

const GhostButton = styled(AddInstructionButton)`
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 6px;
`;

const InstructionHeader = styled(Container)`
  align-items: flex-start;
  font-size: 16px;
`;

const StepContainer = styled(Container)`
  gap: 3px;
  border-radius: 5px;
  padding: 5px 0;
  align-items: flex-start;
`;

const StepNumber = styled(Container)`
  color: ${({ theme }) => color('font', theme)};
  margin-top: 6px;
  margin-right: 3px;
  font-size: 16px;
`;

// todo fix copying
const StyledInput = styled(TextareaAutosize)<{ accent?: boolean }>`
  outline: none;
  border: none;
  color:${({ theme }) => color('font', theme)};
  resize: none;
  background-color: ${({ theme }) => color('background', theme)};
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  padding: 6px;
  max-width: 180px;
  ${({ theme }) => ['ipadv'].includes(theme.screen) && css`
    max-width: 300px;
  `}
  
  &:focus {
    background-color: ${({ theme }) => color('field', theme)};
    border-radius: 6px;
  }
`;
