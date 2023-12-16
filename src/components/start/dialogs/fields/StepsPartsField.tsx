import React, { FC, useEffect, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { isEqual } from 'lodash';
import styled from 'styled-components';
import { Recipe } from '../../../../domain/Recipe';
import { Container } from '../../../ui/Container';
import { theme } from '../../../ui/theme';
import { Instruction as OriginalStepsPart } from '../../../../domain/Instruction';

type Step = {
  id?: number;
  number: number;
  description: string;
};

type StepsPart = {
  id?: number;
  name: string;
  number: number;
  steps: Step[];
};

const StepsPartsField: FC<UseControllerProps<Recipe>> = (props) => {
  const { field } = useController(props);
  const [editablePart, setEditablePart] = useState<StepsPart | undefined>(undefined);
  const [editableStep, setEditableStep] = useState<Step | undefined>(undefined);

  const [parts, setParts] = useState<StepsPart[]>(
    (field.value as OriginalStepsPart[])?.map((sp) => (
      { ...sp, number: sp.id, steps: sp.steps.map((s) => ({ ...s, number: s.id })) }
    )) || [],
  );
  const filteredParts = (sp: StepsPart) => parts.filter((olsSp) => !isEqual(olsSp, sp));
  const filteredSteps = (sp: StepsPart, s: Step) => sp.steps.filter((oldS) => !isEqual(oldS, s));

  const addPart = () => {
    setParts(
      [...parts, {
        id: undefined,
        number: parts.length ? Math.max(...parts.map((sp) => sp.number || 0)) + 1 : 0,
        name: '',
        steps: [],
      }],
    );
  };

  const deletePart = (sp: StepsPart) => {
    setParts(filteredParts(sp));
  };

  const changePart = (name: string) => {
    if (editablePart) {
      const newPart = { ...editablePart, name };
      setParts([...filteredParts(editablePart), newPart]);
      setEditablePart(newPart);
    }
  };

  const addStep = (sp: StepsPart) => {
    setParts([
      ...filteredParts(sp),
      {
        name: sp.name,
        number: sp.number,
        steps: [
          ...sp.steps,
          {
            id: undefined,
            description: '',
            number: sp.steps.length ? Math.max(...sp.steps.map((s) => s.number || 0)) + 1 : 0,
          },
        ],
      }]);
  };

  const deleteStep = (sp: StepsPart, s: Step) => {
    setParts([
      ...filteredParts(sp),
      {
        name: sp.name,
        number: sp.number,
        steps: filteredSteps(sp, s),
      }]);
  };
  const changeStep = (sp: StepsPart, s: Step, description: string) => {
    const newStep = { ...s, description };
    setParts([...filteredParts(sp), { ...sp, steps: [...filteredSteps(sp, s), newStep] }]);
    setEditableStep(newStep);
  };

  useEffect(() => {
    const value = parts.map((sp) => ({
      id: sp.id,
      name: sp.name,
      steps: sp.steps.map((s) => ({
        id: s.id,
        description: s.description,
      })),
    }));
    if (!isEqual(field.value, value)) {
      field.onChange(value);
    }
  }, [field, parts]);

  return (
    <MainContainer vertical gap={10}>

      <Container style={{ width: '100%' }}>
        <div style={{ fontWeight: 'bolder' }}>Приготовление</div>
        <AddPartButton onClick={addPart}>Добавить часть</AddPartButton>
      </Container>

      <Container vertical gap={10} style={{ width: '100%' }}>
        {parts
          .sort((a, b) => (a.number > b.number ? 1 : -1))
          .map((sp, index) => (
            <Container gap={5} key={index} style={{ width: '100%' }}>

              <Container vertical gap={5} style={{ width: '100%' }}>
                {editablePart && isEqual(sp, editablePart)
                  ? (
                    <Container gap={5}>
                      <StyledInput
                        autoFocus
                        value={editablePart?.name}
                        onChange={(e) => changePart(e.target.value)}
                      />
                      <OkButton onClick={() => setEditablePart(undefined)}>ок</OkButton>
                      <OkButton
                        onClick={() => {
                          setEditablePart(undefined);
                          deletePart(sp);
                        }}
                      >
                        удалить
                      </OkButton>
                    </Container>
                  )
                  : (
                    <Container style={{ width: '100%' }}>
                      <PartName
                        empty={!sp.name.length}
                        onClick={() => setEditablePart(sp)}
                      >
                        {sp.name.length ? sp.name : 'Введите название'}
                      </PartName>
                      <AddStepButton onClick={() => addStep(sp)}>Добавить шаг</AddStepButton>
                    </Container>
                  )}

                {sp.steps
                  .sort((a, b) => (a.number > b.number ? 1 : -1))
                  .map((s, sIndex) => (
                    <div key={sIndex} style={{ width: '100%' }}>
                      {editableStep && isEqual(s, editableStep)
                        ? (
                          <Container gap={5}>
                            <StyledInput
                              autoFocus
                              value={s.description}
                              onChange={(e) => changeStep(sp, s, e.target.value)}
                            />
                            <OkButton onClick={() => setEditableStep(undefined)}>ок</OkButton>
                            <OkButton
                              onClick={() => {
                                setEditableStep(undefined);
                                deleteStep(sp, s);
                              }}
                            >
                              удалить
                            </OkButton>
                          </Container>
                        )
                        : (
                          <StepName onClick={() => setEditableStep(s)} empty={!s.description.length}>
                            {sIndex + 1}
                            .
                            {' '}
                            {s.description.length ? s.description : 'Введите описание'}
                          </StepName>
                        )}
                    </div>
                  ))}
              </Container>
            </Container>
          ))}
      </Container>
    </MainContainer>
  );
};

const AddPartButton = styled.div`
  cursor: pointer;
  color: ${theme.color.accent};
  font-size: 14px;
  align-self: center;
`;

const AddStepButton = styled(AddPartButton)`
  font-size: 11px;
`;

const OkButton = styled(AddPartButton)`
  font-size: 11px;
`;

const PartName = styled.div<{ empty: boolean }>`
  cursor: pointer;
  font-size: 14px;
  color: ${({ empty }) => (empty ? theme.color.primaryDisabled : theme.color.primary)};
  ${({ empty }) => (empty ? 'font-style: italic' : '')}
`;

const StepName = styled.div<{ empty: boolean }>`
  cursor: pointer;
  font-size: 14px;
  color: ${({ empty }) => (empty ? theme.color.fontDisabled : '')};
  ${({ empty }) => (empty ? 'font-style: italic' : '')}
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  font-weight: lighter;
`;

const MainContainer = styled(Container)`
  width: calc(100% - 20px);
  overflow-y: auto;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 15px 5px rgba(8, 8, 8, 0.07);
  padding: 15px;
  margin: 0 10px;
  @media (min-width: 890px) {
    width: calc(100% - 40px);
    height: calc(100% - 20px);
    margin: 20px;
  }
`;

export { StepsPartsField };
