import React, { FC, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import styled from 'styled-components';
import { Recipe, Tag } from 'src/domain';
import { Container } from 'src/components/features';
import i18next from 'src/formatter';
import { color } from 'src/theme';
import { AddTag } from 'src/components/dialogs/addTag';

type Props = {
  tags: Tag[];
  label?: string;
};

const TagsField: FC<UseControllerProps<Recipe> & Props> = (props) => {
  const { field } = useController(props);
  const [openNewTag, setOpenNewTag] = useState(false);

  return (
    <>
      <AddTag open={openNewTag} onClose={() => setOpenNewTag(false)} />
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
        <AddTagButton onClick={() => setOpenNewTag(true)}>
          {i18next.t('startpage:recipes.actions.addTag')}
        </AddTagButton>
      </Container>
    </>
  );
};

const StyledContainer = styled(Container)`
  @media (max-width: 1120px) {
    flex-wrap: wrap;
    padding-right: 20px;
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

const AddTagButton = styled.div`
  font-size: 14px;
  color: ${color('accent')};
  cursor: pointer;
`;

export { TagsField };
