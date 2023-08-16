import React, { FC } from 'react';
import styled from 'styled-components';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { FieldError } from 'react-hook-form';
import { FieldError as Error } from './FieldError';
import { Container } from '../Container';

const Field: FC<{
  name: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  errorText?: string;
}> = ({
  name, required, register, placeholder, error, errorText,
}) => (
  <Container vertical gap={5}>
    <StyledInput autoComplete="new-password" {...register(name, { required })} placeholder={placeholder} />
    {error && <Error text={errorText || ''} />}
  </Container>
);

const StyledInput = styled.input<{ size?: 'small' | 'regular' | 'large' }>`
  outline: none;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(115, 107, 150);
  border-radius: 7px;

  color: rgb(66, 61, 86);

  height: ${({ size }) => {
    if (size === 'small') {
      return '24px';
    }
    if (size === 'large') {
      return '24px';
    }
    return '32px';
  }};

  padding: 5px 10px;
`;

export { Field };
