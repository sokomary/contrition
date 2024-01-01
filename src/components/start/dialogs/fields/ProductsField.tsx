import React, { FC, useMemo } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { isEqual } from 'lodash';
import i18next from 'i18next';
import styled from 'styled-components';
import { Recipe, RecipeProduct } from '../../../../domain/Recipe';
import { DropdownField } from '../../../ui/form/DropdownField';
import { Product } from '../../../../domain/Product';
import { Container } from '../../../ui/Container';
import { FieldError } from '../../../ui/form/FieldError';
import { color } from '../../../ui/theme';

const ProductsField: FC<UseControllerProps<Recipe>
& { products: Product[]; onNewClick: () => void; onActive: () => void }> = (props) => {
  const { field, fieldState } = useController({
    ...props,
    rules: {
      validate: (v) => !(v as any[]).find((rp) => rp.quantity === '' || rp.quantity <= 0),
    },
  });

  const options = useMemo(() => props.products.map((p) => ({
    value: {
      product: p,
      quantity: (field.value as RecipeProduct[])?.find((rp) => isEqual(p, rp.product))?.quantity || '',
    },
    label: p.name,
  })), [field.value, props.products]);

  return (
    <Container vertical gap={20}>
      <Container vertical gap={5}>
        <Container>
          <Label>{i18next.t('domain:recipe.recipeProducts')}</Label>
          <AddProductButton onClick={props.onNewClick}>
            {i18next.t('startpage:recipes.actions.addProduct')}
          </AddProductButton>
        </Container>
        <DropdownField
          onActive={props.onActive}
          control={props.control}
          name={props.name}
          rules={{ required: true }}
          options={options}
        />
        {fieldState.error && <FieldError text={i18next.t('startpage:recipes.errors.noQuantity')} />}
      </Container>
    </Container>
  );
};

const Label = styled.div`
  font-size: 17px;
  color: ${color('font')};
`;

const AddProductButton = styled.div`
  font-size: 14px;
  color: ${color('accent')};
  cursor: pointer;
  align-self: center;
`;

export { ProductsField };
