import React, { FC } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { Recipe, Tag } from 'src/domain';
import { Container } from 'src/components/features';
import i18next from 'src/formatter';
import { color } from 'src/theme';

type Props = {
  tags: Tag[];
  label?: string;
  onNewClick: () => void;
};

const TagsField: FC<UseControllerProps<Recipe> & Props> = (props) => {
  const { field } = useController(props);

  return (
    <Container vertical gap={5}>
      {props.label && <Label>{props.label}</Label>}
      <StyledContainer gap={5}>
        {props.tags.map((t) => (
          <TagName
            key={t.id}
            selected={!!(field.value as Tag[])?.filter((tag) => tag.id === t.id).length}
            onClick={() => {
              const includes = (field.value as Tag[])?.filter((tag) => tag.id === t.id).length > 0;
              if (includes) {
                field.onChange((field.value as Tag[])?.filter((tag) => tag.id !== t.id) as Tag[]);
              } else {
                field.onChange([...(field.value as Tag[]), t]);
              }
            }}
          >
            #
            {t.name}
          </TagName>
        ))}
      </StyledContainer>
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
