import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { isAdmin, User } from 'src/domain';
import { useDeviceScreen } from 'src/hooks';
import { Button, Container } from 'src/components/features';
import { CreateIcon, RandomIcon } from 'src/assets';

export const Actions: FC<{ user?: User; onNewClick: () => void; onRandomClick: () => void }> = (props) => {
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
