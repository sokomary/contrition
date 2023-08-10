import styled, { css } from 'styled-components';
import React, { FC, PropsWithChildren } from 'react';

const Button: FC<PropsWithChildren & {
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
  size?: 'small' | 'regular' | 'large';
  disabled?: boolean;
}> = (props) => (
  <StyledButton onClick={props.onClick} type={props.type} size={props.size} disabled={props.disabled}>
    {props.children}
  </StyledButton>
);

const StyledButton = styled.button<{ size?: 'small' | 'regular' | 'large'; disabled?: boolean }>`
  border: none;
  outline: none;
  border-radius: 7px;
  cursor: pointer;
  height: ${({ size }) => {
    if (size === 'small') {
      return '24px';
    }
    if (size === 'large') {
      return '24px';
    }
    return '32px';
  }};
  color: white;
  background-color: #ff7a95;
  opacity: 80%;
  width: fit-content;
  padding: 5px 15px;

  ${(props) => !props.disabled && css`
    &:active {
      background-color: ${() => '#ff9cb0'};
      }
    `}
`;

export { Button };
