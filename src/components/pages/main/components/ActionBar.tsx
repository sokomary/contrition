import React, { FC, Suspense, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTags, logout } from 'src/api';
import { CreateIcon, RandomIcon, ClearIcon } from 'src/assets';
import { useAuthenticate } from 'src/hooks';
import { Tag, isAdmin, User } from 'src/domain';
import { AddRecipe, GetRandomRecipe } from 'src/components/dialogs';
import { Button, Container } from 'src/components/features';
import { color } from 'src/theme';

type Props = {
  onTagChange: (newTag?: Tag) => void;
  onQueryChange: (newQuery: string) => void;
};

const ActionBar: FC<Props> = ({ onTagChange, onQueryChange }) => {
  const user = useAuthenticate();
  const [userOptionsOpen, setUserOptionsOpen] = useState(false);
  const { data: tags } = useQuery('tags', () => getTags());

  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [randomDialogOpen, setRandomDialogOpen] = useState(false);

  return (
    <>
      {tags?.length && (
        <Dialogs
          tags={tags}
          recipeDialogOpen={recipeDialogOpen}
          randomDialogOpen={randomDialogOpen}
          setRecipeDialogOpen={setRecipeDialogOpen}
          setRandomDialogOpen={setRandomDialogOpen}
        />
      )}

      <ActionBarContainer>
        {tags && (
          <ActionBarContent gap={0}>
            <Filters>
              <Tags tags={tags} onTagChange={onTagChange} />
              <Search onQueryChange={onQueryChange} />
            </Filters>
            <UserBlock>
              <Actions
                user={user}
                onRandomClick={() => setRandomDialogOpen(true)}
                onNewClick={() => setRecipeDialogOpen(true)}
              />
              <Container gap={10}>
                <Name>{user?.name}</Name>
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

type DialogsProps = {
  tags: Tag[];
  recipeDialogOpen: boolean;
  randomDialogOpen: boolean;
  setRecipeDialogOpen: (value: boolean) => void;
  setRandomDialogOpen: (value: boolean) => void;
};

const Dialogs: FC<DialogsProps> = (props) => (
  <>
    {props.recipeDialogOpen && (
      <Suspense>
        <AddRecipe
          tags={props.tags}
          open={props.recipeDialogOpen}
          onClose={() => props.setRecipeDialogOpen(false)}
        />
      </Suspense>
    )}
    {props.randomDialogOpen && (
      <GetRandomRecipe
        tags={props.tags}
        open={props.randomDialogOpen}
        onClose={() => props.setRandomDialogOpen(false)}
      />
    )}
  </>
);

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

const Search: FC<{ onQueryChange: (q: string) => void }> = ({ onQueryChange }) => {
  const [q, setQ] = useState('');
  return (
    <SearchContainer>
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

const Actions: FC<{ user?: User; onNewClick: () => void; onRandomClick: () => void }> = (props) => (
  <Container gap={10}>
    {isAdmin(props.user) && (
      <Button onClick={props.onNewClick}>
        <ButtonText>Новый</ButtonText>
        <ButtonIcon><CreateIcon /></ButtonIcon>
      </Button>
    )}
    <Button styleType="primary" onClick={props.onRandomClick}>
      <ButtonText>Случайный</ButtonText>
      <ButtonIcon><RandomIcon /></ButtonIcon>
    </Button>
  </Container>
);

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
  padding: 40px;
`;

const ActionBarContent = styled(Container)`
  border-radius: 20px;
  background-color: ${({ theme }) => color('basic', theme)};
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

const TagsContainer = styled(Container)`
  width: 70%;
  align-items: center;
  color: ${({ theme }) => color('primary', theme)};
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
  background-color: ${({ theme, selected }) => (selected ? color('secondary', theme) : 'transparent')};
  border-radius: 25px;
  color: ${({ theme }) => color('primary', theme)};
  padding: 0 10px;
  align-self: center;
  font-size: 20px;
  cursor: pointer;
  @media (max-width: 740px) {
    padding: 0 5px;
    height: 25px;
  }
`;

const SearchContainer = styled(Container)`
  width: 30%;
  align-items: center;
  position: relative;
  @media (max-width: 810px) {
    width: 50%;
  }
  @media (max-width: 740px) {
    width: 100%;
  }
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
  @media (max-width: 810px) {
    height: 30px;
  }
`;

const UserBlock = styled(Container)`
  width: 30%; 
  background-color: ${({ theme }) => color('accent-light', theme)};
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
  color: ${({ theme }) => color('font', theme)};
  font-size: 18px;
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
    color: ${({ theme }) => color('primary', theme)};
  }
`;

const Photo = styled.div`
  display: flex;
  align-items: center;
`;

const ClearIconContainer = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export { ActionBar };
