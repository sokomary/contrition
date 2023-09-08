import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Tag } from '../../domain/Tag';

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
  width: calc(80% - 34px);
  position: fixed;
  bottom: 50px;
  margin-left: 12px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  align-self: center;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px;
`;

const TagName = styled.div<{ selected?: boolean }>`
  height: 45px;
  background-color: ${({ selected }) => (selected ? 'pink' : 'transparent')};
  border-radius: 20px;
  color: ${({ selected }) => (!selected ? 'pink' : 'rgba(255, 255, 255, 0.95)')};
  font-weight: bold;
  padding: 10px;
  padding-top: 15px;
  align-self: center;
  cursor: pointer;
`;

export { Menu };
