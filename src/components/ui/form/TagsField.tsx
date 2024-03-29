import React, { FC } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import styled from 'styled-components';
import { Recipe } from '../../../domain/Recipe';
import { Tag } from '../../../domain/Tag';
import { Container } from '../Container';
import { color } from '../theme';

const TagsField: FC<UseControllerProps<Recipe> & {
  tags: Tag[];
  label?: string;
}> = (props) => {
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
    </Container>
  );
};

const StyledContainer = styled(Container)`
  @media (max-width: 1120px) {
    flex-wrap: wrap;
    padding-right: 20px;
    justify-content: space-between;
  }
`;

const Label = styled.div`
  color: slategrey;
  font-size: 12px;
`;

const TagName = styled.div<{ selected: boolean }>`
  height: 34px;
  border-radius: 7px;
  padding: 5px 10px;
  background-color: ${({ selected }) => (selected ? color('accent-light') : color('field'))};
  color: ${({ selected }) => (selected ? color('accent') : color('font'))};
  cursor: pointer;
  width: fit-content;
`;

export { TagsField };
