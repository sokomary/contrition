import styled, { css } from 'styled-components';
import React, { FC, PropsWithChildren } from 'react';
import { color } from 'src/theme';
import { CommonProps } from './CommonProps';

type Props = {
  onClick?: () => void;
  styleType?: 'primary' | 'accent';
  type?: 'submit' | 'reset' | 'button';
  size?: 'small' | 'regular' | 'large';
  disabled?: boolean;
};

export const Button: FC<PropsWithChildren & CommonProps & Props> = (props) => (
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
  
  font-size: 16px;
  
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
        background-color: ${({ theme }) => color('accent', theme)};
      `;
    }
    return css`
        color: ${({ theme }) => color('primary', theme)};
        background-color: ${({ theme }) => color('secondary', theme)};
      `;
  }};
  
  opacity: 80%;
  width: fit-content;
  min-width: fit-content;
  padding: 5px 15px;

  ${(props) => !props.disabled && css`
    &:active {
      background-color: ${({ theme }) => color(props.styleType === 'accent' ? 'accent-light' : 'primary-disabled', theme)};
    }
  `}
`;
