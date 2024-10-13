import React from 'react';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { FieldError } from 'react-hook-form';
import { FieldError as Error } from './FieldError';
import * as css from './Field.css';

type Props = {
  className?: string;
  step?: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  errorText?: string;
  size?: 'small' | 'regular' | 'large';
};

export const Field = ({
  name, type, size = 'regular', step, className, required, register, placeholder, error, errorText,
}: Props) => (
  <div className={`${css.container} ${className}`}>
    <input
      className={`${css.input({ size })}`}
      type={type || 'text'}
      step={step}
      autoComplete="new-password"
      {...register(name, { required })}
      placeholder={placeholder}
    />
    {error && <Error text={errorText || ''} />}
  </div>
);
