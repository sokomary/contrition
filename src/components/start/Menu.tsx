import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Tag } from '../../domain/Tag';
import { theme } from '../ui/theme';

const Menu: FC<{ tags: Tag[]; onChange: (tag?: Tag) => void }> = ({ tags, onChange }) => {
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

const MenuBar = styled.div`
  height: 49px;
  width: calc(100% - 80px);
  margin-left: 40px;
  position: absolute;
  bottom: 50px;
  align-self: center;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px;
  
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
  
  @media (max-width: 890px) {
    display: none;
  }

`;

const TagName = styled.div<{ selected?: boolean }>`
  height: 45px;
  background-color: ${({ selected }) => (selected ? theme.color.secondary : 'transparent')};
  border-radius: 25px;
  color: ${theme.color.primary};
  padding: 10px 25px;
  align-self: center;
  font-size: 20px;
  cursor: pointer;
`;

export { Menu };
