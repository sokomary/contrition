import React from 'react';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import i18next from 'src/formatter';
import { Field } from 'src/components/features';
import { Product } from 'src/types/domain';
import { FieldError } from 'react-hook-form';
import * as css from './NumberField.css';

type Props = {
  name: string;
  register: UseFormRegister<Product>;
  error?: FieldError;
};

export const NumberField = ({ name, register, error }: Props) => (
  <Field
    className={css.field}
    type="number"
    step="0.01"
    name={name}
    register={register}
    placeholder={i18next.t(`domain:recipe.${name}`)}
    error={error}
    errorText={i18next.t('forms:fields.errors.required')}
    required
  />
);
