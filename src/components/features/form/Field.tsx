import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { FieldError } from 'react-hook-form';
import { Container } from 'src/components/features';
import { color } from 'src/theme';
import { FieldError as Error } from './FieldError';

type Props = {
  style?: CSSProperties;
  className?: string;
  step?: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  errorText?: string;
  width?: number;
  size?: 'small' | 'regular' | 'large';
};

export const Field = ({
  name, type, size, step, style, className, required, register, placeholder, error, errorText, width,
}: Props) => (
  <Container vertical gap={5}>
    <StyledInput
      heightSize={size}
      style={style}
      className={className}
      type={type || 'text'}
      step={step}
      width={width}
      autoComplete="new-password"
      {...register(name, { required })}
      placeholder={placeholder}
    />
    {error && <Error text={errorText || ''} />}
  </Container>
);

const StyledInput = styled.input<{ heightSize?: 'small' | 'regular' | 'large' | undefined }>`
  outline: none;
  border-radius: 7px;
  border: none;
  background-color: ${({ theme }) => color('field', theme)};
  color:${({ theme }) => color('font', theme)};
  font-size: 16px;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  };
  
  height: ${({ heightSize }) => {
    if (heightSize === 'small') {
      return '24px';
    }
    if (heightSize === 'large') {
      return '42px';
    }
    return '34px';
  }};

  padding: 5px 10px;

  ${({ width }) => width && `width: ${width}px`};
`;
