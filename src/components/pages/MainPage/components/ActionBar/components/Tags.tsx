import React, { useState } from 'react';
import { Tag } from 'src/domain';
import styled, { css } from 'styled-components';
import { Container } from 'src/components/features';
import { color } from 'src/theme';

type Props = {
  tags: Tag[];
  onSelect: (tag?: Tag) => void;
};

export const Tags = (props: Props) => {
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);
  const selectTag = (tag: Tag) => {
    const newTag = selectedTag?.id !== tag.id ? tag : undefined;
    setSelectedTag(newTag);
    props.onSelect(newTag);
  };

  return (
    <TagsContainer>
      {props.tags?.map((t) => (
        <TagName
          selected={selectedTag?.id === t.id}
          onClick={() => selectTag(t)}
          key={t.id}
        >
          {t.name}
        </TagName>
      ))}
    </TagsContainer>
  );
};

const TagsContainer = styled(Container)`
  width: 70%;
  align-items: center;
  color: ${({ theme }) => color('primary', theme)};
  font-size: 18px;
  padding: 0 30px 0 20px;

  ${({ theme }) => theme.screen === 'iphone' && css`
    width: 100%;
    padding: 0;
  `}
`;

const TagName = styled.div<{ selected?: boolean }>`
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  border-radius: 25px;
  color: ${({ theme }) => color('primary', theme)};
  padding: 3px 10px;
  align-self: center;
  font-size: 18px;
  cursor: pointer;

  ${({ theme }) => theme.screen === 'iphone' && css`
    padding: 0 5px;
    height: 25px;
  `}
`;
