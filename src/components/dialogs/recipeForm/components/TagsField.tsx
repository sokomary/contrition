import React, { FC } from 'react';
import {
  useController, UseControllerProps, useFieldArray,
} from 'react-hook-form';
import styled, { css } from 'styled-components';
import { Recipe, Tag } from 'src/domain';
import { Container, FieldError } from 'src/components/features';
import i18next from 'src/formatter';
import { color } from 'src/theme';
import { find } from 'lodash';

type Props = {
  tags: Tag[];
  label?: string;
  onNewClick: () => void;
};

const TagsField: FC<UseControllerProps<Recipe> & Props> = (props) => {
  const { fieldState } = useController({
    ...props,
  });

  const {
    fields, append, remove,
  } = useFieldArray({
    control: props.control,
    name: 'tags',
    keyName: 'key',
    rules: {
      validate: (v) => (v as any[]).length !== 0,
    },
  });

  return (
    <Container vertical gap={5}>
      {props.label && <Label>{props.label}</Label>}
      <StyledContainer gap={5}>
        {fields
          .map((t, index) => (
            <TagName key={t.id} selected onClick={() => remove(index)}>
              #
              {t.name}
            </TagName>
          ))}
        {props.tags
          .filter((unselected) => !find(fields, unselected))
          .map((t) => (
            <TagName key={t.id} selected={false} onClick={() => append(t)}>
              #
              {t.name}
            </TagName>
          ))}
      </StyledContainer>
      {fieldState.error && <FieldError text={i18next.t('startpage:recipes.errors.tags')} />}
      <AddTagButton onClick={props.onNewClick}>
        {i18next.t('startpage:recipes.actions.addTag')}
      </AddTagButton>
    </Container>
  );
};

const StyledContainer = styled(Container)`
  ${({ theme }) => !['mac'].includes(theme.screen) && css`
    flex-wrap: wrap;
  `};
`;

const Label = styled.div`
  color: slategrey;
  font-size: 12px;
`;

const TagName = styled.div<{ selected: boolean }>`
  height: 34px;
  border-radius: 7px;
  padding: 5px 10px;
  background-color: ${({ theme, selected }) => color(selected ? 'accent-light' : 'field', theme)};
  color: ${({ theme, selected }) => color(selected ? 'accent' : 'font', theme)};
  cursor: pointer;
  width: fit-content;
`;

const AddTagButton = styled.div`
  font-size: 16px;
  color: ${({ theme }) => color('primary', theme)};
  cursor: pointer;
`;

export { TagsField };
