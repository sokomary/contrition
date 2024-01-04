import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { color } from '../ui/theme';
import { Tag } from '../../domain/Tag';
import { ReactComponent as CreateSvg } from '../../assets/icons/create.svg';
import { ReactComponent as RandomSvg } from '../../assets/icons/random.svg';
import { ReactComponent as ClearSvg } from '../../assets/icons/clear_icon.svg';
import { logout } from '../../api/api';
import { useAuthenticate } from '../../hooks/useAuthenticate';
import { isAdmin } from '../../domain/User';

const ActionBar: FC<{
  tags: Tag[];
  onNewClick: () => void; onRandomClick: () => void;
  onTagChange: (newTag?: Tag) => void; onQueryChange: (newQuery: string) => void;
}> = (
  {
    tags, onNewClick, onRandomClick, onTagChange, onQueryChange,
  },
) => {
  const user = useAuthenticate();
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);
  const [q, setQ] = useState('');
  const [userOptionsOpen, setUserOptionsOpen] = useState(false);

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
          <Container gap={0} style={{ width: '100%', position: 'relative' }}>
            <SearchInput
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                onQueryChange(e.target.value);
              }}
              placeholder="Поиск"
            />
            <ClearIconContainer onClick={() => {
              setQ('');
              onQueryChange('');
            }}
            >
              <ClearSvg />
            </ClearIconContainer>
          </Container>
        </Search>
      </Filters>
      <PersonalInfo>
        <Container gap={10}>
          {isAdmin(user) && (
          <Button onClick={onNewClick}>
            <ButtonText>Новый</ButtonText>
            <ButtonIcon><CreateSvg /></ButtonIcon>
          </Button>
          )}
          <Button styleType="primary" onClick={onRandomClick}>
            <ButtonText>Случайный</ButtonText>
            <ButtonIcon><RandomSvg /></ButtonIcon>
          </Button>
        </Container>
        <Container gap={10}>
          <Name>
            { user?.name }
          </Name>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex,max-len */}
          <UserInfo tabIndex={0} onBlur={() => setUserOptionsOpen(false)}>
            <Circle
              onClick={() => setUserOptionsOpen(true)}
              src={user?.picture}
            />
            {userOptionsOpen && <UserOptions />}
          </UserInfo>
        </Container>
      </PersonalInfo>
    </ActionBarContainer>
  );
};

const UserOptions = () => {
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      window.location.href = '/login';
    },
  });
  return (
    <Options>
      <Option onClick={() => logoutMutation.mutate()}>Выйти</Option>
    </Options>
  );
};

const ActionBarContainer = styled(Container)`
  border-radius: 20px;
  background-color: ${color('background')};
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
  height: 62px;

  @media (max-width: 810px) {
    flex-direction: column-reverse;
    height: 80px;
  }
  @media (max-width: 740px) {
    height: 130px;
    padding-bottom: 10px;
  }

`;

const Filters = styled(Container)`
  width: 70%;
  padding: 0 10px;
  @media (max-width: 810px) {
    width: 100%;
    padding: 10px;
  }
  @media (max-width: 740px) {
    flex-direction: column;
    gap: 10px;
    padding: 0 10px;
  }
`;
const Tags = styled(Container)`
  width: 70%;
  align-items: center;
  color: ${color('primary')};
  font-size: 18px;
  padding: 0 30px 0 20px;

  @media (max-width: 810px) {
    width: 50%;
    padding: 0;
  }
  @media (max-width: 740px) {
    width: 100%;
    padding: 0;
  }
`;
const TagName = styled.div<{ selected?: boolean }>`
  background-color: ${({ selected }) => (selected ? color('secondary') : 'transparent')};
  border-radius: 25px;
  color: ${color('primary')};
  padding: 0 10px;
  align-self: center;
  font-size: 20px;
  cursor: pointer;
  
  @media (max-width: 740px) {
    padding: 0 5px;
    height: 25px;
  }
`;
const Search = styled(Container)`
  width: 30%;
  align-items: center;

  @media (max-width: 810px) {
    width: 50%;
  }
  @media (max-width: 740px) {
    width: 100%;
  }
`;
const SearchInput = styled.input`
  height: 42px;
  border-radius: 15px;
  background-color: ${color('field')};
  color: ${color('label')};
  outline: none;
  border: none;
  padding: 0 15px;
  align-self: center;
  font-size: 16px;
  width: 100%;

  @media (max-width: 810px) {
    height: 30px;
  }
`;

const PersonalInfo = styled(Container)`
  width: 30%; 
  background-color: ${color('accent-light')};
  align-items: center;
  padding: 0 10px;
  border-radius: inherit;

  @media (max-width: 810px) {
    width: 100%;
    height: 45px;
  }
`;

const Name = styled.div`
  align-self: center; 
  color: ${color('accent')};
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 1300px) {
    display: none;
  }
`;
const Circle = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: white;
  cursor: pointer;
`;

const ButtonText = styled.span`
  @media (min-width: 810px) {
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
  @media (max-width: 810px) {
    display: none;
  }
`;

const Options = styled(Container)`
  position: absolute;
  border-radius: 5px;
  background: #FFF;
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
  padding: 8px;
  
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  right: 60px;
  top: 95px;
`;

const Option = styled.div`
  width: 70px;
  height: 25px;
  display: flex;
  align-items: center;
  padding: 0 4px;
  cursor: pointer;
  &:hover {
    color: ${color('primary')}
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ClearIconContainer = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
`;

export { ActionBar };
