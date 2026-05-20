import React from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { Field } from 'src/components/features';
import { Product } from 'src/types/domain';
import { FieldError } from 'react-hook-form';
import * as css from './NumberField.css';

type RecipeNumberKey = 'calories' | 'protein' | 'fats' | 'carbohydrates';

type Props = {
  name: RecipeNumberKey;
  register: UseFormRegister<Product>;
  error?: FieldError;
};

export const NumberField = ({ name, register, error }: Props) => {
  const { t } = useTranslation();
  return (
    <Field
      className={css.field}
      type='number'
      step='0.01'
      name={name}
      register={register}
      placeholder={t(`domain.recipe.${name}`)}
      error={error}
      errorText={t('forms.fields.errors.required')}
      required
    />
  );
};
