import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Tag } from '../../domain/Tag';
import { theme } from '../ui/theme';

const MobileMenu: FC<{ tags: Tag[]; onChange: (tag?: Tag) => void }> = ({ tags, onChange }) => {
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);

  const onTagChange = (tag: Tag) => {
    const newTag = selectedTag?.id !== tag.id ? tag : undefined;
    setSelectedTag(newTag);
    onChange(newTag);
  };

  return (
    <MenuBar>
      {tags.map((t, index) => (
        <TagName
          selected={selectedTag?.id === t.id}
          onClick={() => onTagChange(t)}
          key={index}
        >
          {t.name}
        </TagName>
      ))}
    </MenuBar>
  );
};

const MenuBar = styled.div`display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 40px 0 40px;

  @media (min-width: 890px) {
    display: none;
  }
`;

const TagName = styled.div<{ selected?: boolean }>`
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  color: ${theme.color.accent};
  align-self: center;
  font-size: 15px;
  cursor: pointer;
`;

export { MobileMenu };
