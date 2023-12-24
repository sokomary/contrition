import styled, { css } from 'styled-components';
import React, { FC, PropsWithChildren } from 'react';
import { CommonProps } from './CommonProps';
import { color } from './theme';

type Props = {
  onClick?: () => void;
  styleType?: 'primary' | 'accent';
  type?: 'submit' | 'reset' | 'button';
  size?: 'small' | 'regular' | 'large';
  disabled?: boolean;
};
const Button: FC<PropsWithChildren & CommonProps & Props> = (props) => (
  <StyledButton
    style={props.style}
    styleType={props.styleType}
    className={props.className}
    onClick={props.onClick}
    type={props.type || 'button'}
    size={props.size}
    disabled={props.disabled}
  >
    {props.children}
  </StyledButton>
);

const StyledButton = styled.button<Props>`
  border: none;
  outline: none;
  border-radius: 15px;
  cursor: pointer;
  
  font-size: 17px;
  
  height: ${({ size }) => {
    if (size === 'small') {
      return '24px';
    }
    if (size === 'large') {
      return '45px';
    }
    return '32px';
  }};
  
  ${({ styleType }) => {
    if (styleType === 'accent') {
      return css`
        color: white;
        background-color: ${color('accent')};
      `;
    }
    return css`
        color: ${color('primary')};
        background-color: ${color('secondary')};
      `;
  }};

  
  opacity: 80%;
  width: fit-content;
  min-width: fit-content;
  padding: 5px 15px;

  ${(props) => !props.disabled && css`
    &:active {
      background-color: ${() => (props.styleType === 'accent' ? color('accent-light') : color('primary-disabled'))};
      }
    `}
`;

export { Button };
