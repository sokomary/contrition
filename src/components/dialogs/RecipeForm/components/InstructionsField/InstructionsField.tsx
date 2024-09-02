import React, {
} from 'react';
import {
  Control,
  useFieldArray,
} from 'react-hook-form';
import styled, { css } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { Recipe } from 'src/domain';
import { Container } from 'src/components/features';
import { color } from 'src/theme';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { InstructionSteps } from './components/InstructionSteps';

type Props = {
  control: Control<Recipe>;
  register: UseFormRegister<Recipe>;
};

export const InstructionsField = (props: Props) => {
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
                placeholder="Название"
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

const Header = styled(Container)`
  width: 100%;
  font-size: 16px;
  color:${({ theme }) => color('font', theme)};
`;

const AddInstructionButton = styled.div`
  cursor: pointer;
  color: ${({ theme }) => color('primary', theme)};
  font-size: 16px;
  font-weight: normal;
  align-self: flex-start;
`;

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

const InstructionName = styled(StyledInput)`
  font-size: 16px;
  color: ${({ theme }) => color('accent', theme)};
  margin-left: -8px;
`;

const MainContainer = styled(Container)`
  max-height: 428px;
  margin-left: 20px;
  width: 30%;
  padding: 0 10px;

  ${({ theme }) => !['mac'].includes(theme.screen) && css`
    width: 100%;
    margin-left: 0;
    max-height: fit-content;
  `};

  ${({ theme }) => ['ipadh'].includes(theme.screen) && css`
    max-height: 320px;
  `}
  ${({ theme }) => ['ipadv'].includes(theme.screen) && css`
    max-height: 430px;
  `}
`;

const ContentContainer = styled(Container)`
  background: ${({ theme }) => color('background', theme)};
  box-shadow: 0 0 15px 5px rgba(8, 8, 8, 0.07);
  min-height: 34px;
  border-radius: 10px;
  padding: 15px;
  overflow-y: auto;
`;
