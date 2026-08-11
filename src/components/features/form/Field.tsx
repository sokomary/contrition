import React, { useId } from 'react';
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
  label?: string;
  error?: FieldError;
};

export const Field = ({
  name,
  type,
  step,
  className,
  register,
  placeholder,
  label,
  error,
}: Props) => {
  const inputId = useId();

  return (
    <div className={`${css.container} ${className}`}>
      <label className={css.label} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={css.input}
        type={type || 'text'}
        step={step}
        autoComplete='new-password'
        aria-invalid={error ? true : undefined}
        {...register(name)}
        placeholder={placeholder}
      />
      {error?.message && <Error text={error.message} />}
    </div>
  );
};
