import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTags, logout } from 'src/api';
import {
  CreateIcon, RandomIcon, ClearIcon, DropDownIcon, DropUpIcon,
} from 'src/assets';
import { useAuthenticate } from 'src/hooks';
import { Tag, isAdmin, User } from 'src/domain';
import { Button, Container } from 'src/components/features';
import { color } from 'src/theme';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';
import { Dialogs } from './components/Dialogs';

// todo посмотреть где можно использовать Partial

type Props = {
  recipeInfoOpen: boolean;
  infoOpen: boolean;
  setInfoOpen: (value: boolean) => void;
  onTagChange: (newTag?: Tag) => void;
  onQueryChange: (newQuery: string) => void;
  onNewClick: () => void;
};

const ActionBar: FC<Props> = ({
  infoOpen, recipeInfoOpen, setInfoOpen, onTagChange, onQueryChange, onNewClick,
}) => {
  const user = useAuthenticate();
  const [userOptionsOpen, setUserOptionsOpen] = useState(false);
  const { data: tags } = useQuery('tags', () => getTags());
  const [randomDialogOpen, setRandomDialogOpen] = useState(false);
  const screen = useDeviceScreen();

  return (
    <>
      {tags?.length && (
        <Dialogs
          tags={tags}
          randomDialogOpen={randomDialogOpen}
          setRandomDialogOpen={setRandomDialogOpen}
        />
      )}
      <ActionBarContainer>
        {tags && (
          <ActionBarContent gap={0}>
            <FiltersContainer>
              <InfoControl>
                {infoOpen
                  ? <StyledDropUpIcon onClick={() => setInfoOpen(!infoOpen)} />
                  : <StyledDropDownIcon onClick={() => setInfoOpen(!infoOpen)} />}
              </InfoControl>
              <Filters>
                <Tags tags={tags} onTagChange={onTagChange} />
                {screen !== 'iphone' && <Search onQueryChange={onQueryChange} />}
              </Filters>
            </FiltersContainer>
            <UserBlock>
              <Actions
                user={user}
                onRandomClick={() => setRandomDialogOpen(true)}
                onNewClick={onNewClick}
              />
              <Container gap={10}>
                {((screen === 'mac' || screen === 'ipadh') && !recipeInfoOpen) && <Name>{user?.name}</Name>}
                {screen === 'iphone' && <Search onQueryChange={onQueryChange} />}
                <Photo tabIndex={0} onBlur={() => setUserOptionsOpen(false)}>
                  <Circle onClick={() => setUserOptionsOpen(true)} src={user?.picture} />
                  {userOptionsOpen && <UserOptions />}
                </Photo>
              </Container>
            </UserBlock>
          </ActionBarContent>
        )}
      </ActionBarContainer>
    </>
  );
};

const Tags: FC<{ tags: Tag[]; onTagChange: (tag?: Tag) => void }> = (props) => {
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);
  const changeTag = (tag: Tag) => {
    const newTag = selectedTag?.id !== tag.id ? tag : undefined;
    setSelectedTag(newTag);
    props.onTagChange(newTag);
  };
  return (
    <TagsContainer>
      {props.tags?.map((t) => (
        <TagName
          selected={selectedTag?.id === t.id}
          onClick={() => changeTag(t)}
          key={t.id}
        >
          {t.name}
        </TagName>
      ))}
    </TagsContainer>
  );
};

const Search: FC<{ onQueryChange: (q: string) => void; className?: string }> = ({ onQueryChange, className }) => {
  const [q, setQ] = useState('');
  return (
    <SearchContainer className={className}>
      <StyledInput
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          onQueryChange(e.target.value);
        }}
        placeholder="Поиск"
      />
      <ClearIconContainer
        onClick={() => {
          setQ('');
          onQueryChange('');
        }}
      >
        <ClearIcon />
      </ClearIconContainer>
    </SearchContainer>
  );
};

const Actions: FC<{ user?: User; onNewClick: () => void; onRandomClick: () => void }> = (props) => {
  const screen = useDeviceScreen();
  return (
    <Container gap={10}>
      {isAdmin(props.user) && (
        <StyledButton onClick={props.onNewClick}>
          {screen === 'mac' ? <div>Новый</div> : <StyledCreateIcon /> }
        </StyledButton>
      )}
      <StyledButton styleType="primary" onClick={props.onRandomClick}>
        {screen === 'mac' ? <div>Случайный</div> : <StyledRandomIcon />}
      </StyledButton>
    </Container>
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

const ActionBarContainer = styled.div`
  padding: 40px 40px 20px 40px;

  ${({ theme }) => ['ipadv', 'ipadh'].includes(theme.screen) && css`
    padding: 20px;
  `};
  ${({ theme }) => theme.screen === 'iphone' && css`
    padding: 15px;
  `};
`;

const FiltersContainer = styled(Container)`
  display: contents;
  
  ${({ theme }) => theme.screen === 'iphone' && css`
    display: flex;
    width: 100%;
    padding: 6px 15px;
    gap: 15px;
  `};
`;

const InfoControl = styled(Container)`
  justify-items: center;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 62px;
  width: 62px;
  border-radius: 20px;
  background-color: ${({ theme }) => color('accent-light', theme)};

  ${({ theme }) => theme.screen === 'iphone' && css`
    background-color: transparent;
    height: fit-content;
    width: fit-content;
  `}
`;

const StyledDropDownIcon = styled(DropDownIcon)`
  cursor: pointer;
`;
const StyledDropUpIcon = styled(DropUpIcon)`
  cursor: pointer;
`;

const ActionBarContent = styled(Container)`
  border-radius: 20px;
  background-color: ${({ theme }) => color('basic', theme)};
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
  
  ${({ theme }) => theme.screen === 'iphone' && css`
    flex-direction: column-reverse;
  `}
`;

const Filters = styled(Container)`
  width: 70%;
  padding: 0 10px;

  ${({ theme }) => theme.screen === 'iphone' && css`
    width: 100%;
    gap: 10px;
    padding: 0;
    justify-content: space-between;
  `}
`;

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

const SearchContainer = styled(Container)`
  width: 30%;
  align-items: center;
  position: relative;

  ${({ theme }) => theme.screen === 'iphone' && css`
    width: 100%;
  `}
`;

const StyledInput = styled.input`
  height: 42px;
  border-radius: 15px;
  background-color: ${({ theme }) => color('field', theme)};
  color:${({ theme }) => color('label', theme)};
  outline: none;
  border: none;
  padding: 0 15px;
  align-self: center;
  font-size: 16px;
  width: 100%;

  ${({ theme }) => theme.screen === 'iphone' && css`
    height: 30px;
    border-radius: 10px;
  `}
`;

const UserBlock = styled(Container)`
  width: 30%; 
  background-color: ${({ theme }) => color('accent-light', theme)};
  align-items: center;
  padding: 0 10px;
  border-radius: inherit;

  ${({ theme }) => theme.screen === 'iphone' && css`
    width: 100%;
    height: 58px;
    padding: 0 15px;
    gap: 10px
  `}
`;

const Name = styled.div`
  align-self: center; 
  color: ${({ theme }) => color('font', theme)};
  font-size: 16px;
`;

const Circle = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: white;
  cursor: pointer;

  ${({ theme }) => theme.screen === 'iphone' && css`
    height: 30px;
    width: 30px;
    border-radius: 15px;
  `}
`;

const StyledButton = styled(Button)`
  ${({ theme }) => theme.screen === 'iphone' && css`
    border-radius: 10px;
    height: 30px;
  `}
`;

const StyledCreateIcon = styled(CreateIcon)`
  ${({ theme }) => theme.screen === 'iphone' && css`
    height: 20px;
    width: 20px;
  `}
`;

const StyledRandomIcon = styled(RandomIcon)`
  ${({ theme }) => theme.screen === 'iphone' && css`
    height: 20px;
    width: 20px;
  `}
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
  right: 0;
  top: 45px;
`;

const Option = styled.div`
  width: 70px;
  height: 25px;
  display: flex;
  align-items: center;
  padding: 0 4px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => color('primary', theme)};
  }
`;

const Photo = styled.div`
  display: flex;
  align-items: center;
position: relative;
`;

const ClearIconContainer = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export { ActionBar };
