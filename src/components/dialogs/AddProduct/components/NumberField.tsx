import React from 'react';
import styled from 'styled-components';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import i18next from 'src/formatter';
import { Field } from 'src/components/features';
import { Product } from 'src/domain';
import { FieldError } from 'react-hook-form';

type Props = {
  name: string;
  register: UseFormRegister<Product>;
  error?: FieldError;
};

export const NumberField = ({ name, register, error }: Props) => (
  <StyledField
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

const StyledField = styled(Field)`
  width: 97px;
  ${({ theme }) => theme.screen === 'iphone' && ' width: 98px'};
`;
