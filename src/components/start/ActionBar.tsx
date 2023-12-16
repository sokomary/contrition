import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { theme } from '../ui/theme';
import { Tag } from '../../domain/Tag';
import { ReactComponent as CreateSvg } from '../../assets/icons/create.svg';
import { ReactComponent as RandomSvg } from '../../assets/icons/random.svg';

const ActionBar: FC<{
  tags: Tag[];
  onNewClick: () => void; onRandomClick: () => void;
  onTagChange: (newTag?: Tag) => void; onQueryChange: (newQuery: string) => void;
}> = (
  {
    tags, onNewClick, onRandomClick, onTagChange, onQueryChange,
  },
) => {
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);
  const [q, setQ] = useState('');

  const changeTag = (tag: Tag) => {
    const newTag = selectedTag?.id !== tag.id ? tag : undefined;
    setSelectedTag(newTag);
    onTagChange(newTag);
  };
  return (
    <ActionBarContainer gap={0}>
      <Filters>
        <Tags>
          {tags?.map((t) => (
            <TagName
              selected={selectedTag?.id === t.id}
              onClick={() => changeTag(t)}
              key={t.id}
            >
              {t.name}
            </TagName>
          ))}
        </Tags>
        <Search>
          <SearchInput
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              onQueryChange(e.target.value);
            }}
            placeholder="Поиск"
          />
        </Search>
      </Filters>
      <PersonalInfo>
        <Container gap={10}>
          <Button onClick={onNewClick}>
            <ButtonText>Новый</ButtonText>
            <ButtonIcon><CreateSvg /></ButtonIcon>
          </Button>
          <Button styleType="primary" onClick={onRandomClick}>
            <ButtonText>Случайный</ButtonText>
            <ButtonIcon><RandomSvg /></ButtonIcon>
          </Button>
        </Container>
        <Container gap={10}>
          <Name>
            Мария
          </Name>
          <Circle />
        </Container>
      </PersonalInfo>
    </ActionBarContainer>
  );
};

const ActionBarContainer = styled(Container)`
  border-radius: 20px;
  background: #FFF;
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
  height: 62px;

  @media (max-width: 707px) {
    flex-direction: column-reverse;
    height: 80px;
  }
  @media (max-width: 690px) {
    height: 130px;
    padding-bottom: 10px;
  }
`;

const Filters = styled(Container)`
  width: 70%;
  padding: 0 10px;
  @media (max-width: 707px) {
    width: 100%;
  }
  @media (max-width: 690px) {
    flex-direction: column;
  }
`;
const Tags = styled(Container)`
  width: 70%;
  align-items: center;
  color: ${theme.color.primary};
  font-size: 18px;
  padding: 0 30px 0 20px;

  @media (max-width: 707px) {
    width: 50%;
  }
  @media (max-width: 690px) {
    width: 100%;
    padding: 10px 0;
  }
`;
const TagName = styled.div<{ selected?: boolean }>`
  height: 45px;
  background-color: ${({ selected }) => (selected ? theme.color.secondary : 'transparent')};
  border-radius: 25px;
  color: ${theme.color.primary};
  padding: 10px 5px;
  align-self: center;
  font-size: 20px;
  cursor: pointer;
  
  @media (max-width: 690px) {
    padding: 0;
    height: 25px;
  }
`;
const Search = styled(Container)`
  width: 30%;
  align-items: center;

  @media (max-width: 707px) {
    width: 50%;
  }
  @media (max-width: 690px) {
    width: 100%;
  }
`;
const SearchInput = styled.input`
  height: 42px;
  border-radius: 15px;
  background-color: ${theme.color.field};
  color: ${theme.color.label};
  outline: none;
  border: none;
  padding: 0 15px;
  align-self: center;
  font-size: 16px;
  width: 100%;

  @media (max-width: 707px) {
    height: 30px;
  }
`;

const PersonalInfo = styled(Container)`
  width: 30%; 
  background-color: ${theme.color.accentLight};
  align-items: center;
  padding: 0 10px;
  border-radius: inherit;

  @media (max-width: 707px) {
    width: 100%;
    height: 45px;
  }
`;

const Name = styled.div`
  align-self: center; 
  color: ${theme.color.accent};
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 1300px) {
    display: none;
  }
`;
const Circle = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: white;
`;

const ButtonText = styled.span`
  @media (min-width: 707px) {
    display: none;
  }
  @media (min-width: 960px) {
    display: flex;
  }
`;
const ButtonIcon = styled.span`
  @media (min-width: 961px) {
    display: none;
  }
  @media (max-width: 707px) {
    display: none;
  }
`;

export { ActionBar };
