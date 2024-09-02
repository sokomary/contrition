import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from 'react-query';
import { getTags } from 'src/api';
import {
  DropDownIcon, DropUpIcon,
} from 'src/assets';
import { useAuthenticate } from 'src/hooks';
import { Tag } from 'src/domain';
import { Container } from 'src/components/features';
import { color } from 'src/theme';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';
import { GetRandomRecipe } from 'src/components/dialogs';
import { Tags } from './components/Tags';
import { Search } from './components/Search';
import { UserOptions } from './components/UserOptions';
import { Actions } from './components/Actions';

type Props = {
  recipeInfoOpen: boolean;
  infoOpen: boolean;
  setInfoOpen: (value: boolean) => void;
  onTagChange: (newTag?: Tag) => void;
  onQueryChange: (newQuery: string) => void;
  onNewClick: () => void;
};

const ActionBar = ({
  infoOpen, recipeInfoOpen, setInfoOpen, onTagChange, onQueryChange, onNewClick,
}: Props) => {
  const user = useAuthenticate();
  const { data: tags } = useQuery('tags', () => getTags());
  const [userOptionsOpen, setUserOptionsOpen] = useState(false);
  const [randomDialogOpen, setRandomDialogOpen] = useState(false);
  const screen = useDeviceScreen();

  return (
    <>
      <GetRandomRecipe
        open={randomDialogOpen}
        onClose={() => setRandomDialogOpen(false)}
      />
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
                <Tags tags={tags} onSelect={onTagChange} />
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

const Photo = styled.div`
  display: flex;
  align-items: center;
position: relative;
`;

export { ActionBar };
