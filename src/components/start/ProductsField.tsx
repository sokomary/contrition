import React, { FC, useMemo } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { isEqual } from 'lodash';
import i18next from 'i18next';
import styled from 'styled-components';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Recipe, RecipeProduct } from '../../domain/Recipe';
import { DropdownField } from '../ui/form/DropdownField';
import { Product } from '../../domain/Product';
import { Container } from '../ui/Container';
import { FieldError } from '../ui/form/FieldError';
import { ReactComponent as DeleteSvg } from '../../icons/delete-icon.svg';

const ProductsField: FC<UseControllerProps<Recipe> & { products: Product[] }> = (props) => {
  const { field, fieldState } = useController({
    ...props,
    rules: {
      validate: (v) => !(v as any[]).find((rp) => rp.quantity === '' || rp.quantity <= 0),
    },
  });

  const options = useMemo(() => props.products.map((p) => ({
    value: {
      product: p,
      quantity: (field.value as RecipeProduct[]).find((rp) => isEqual(p, rp.product))?.quantity || '',
    },
    label: p.name,
  })), [field.value, props.products]);

  return (
    <Container vertical gap={20}>
      <Container vertical gap={5}>
        <DropdownField
          label={i18next.t('domain:recipe.recipeProducts')}
          control={props.control}
          name={props.name}
          rules={{ required: true }}
          options={options}
        />
        {fieldState.error && <FieldError text={i18next.t('startpage:recipes.errors.noQuantity')} />}
      </Container>
      <StyledContainer gap={20}>
        {(field.value as RecipeProduct[])
          .sort((rp1, rp2) => (rp1.product.id > rp2.product.id ? 1 : -1))
          .map((sp) => (
            <Container key={sp.product.id}>
              <QuantityInput
                value={sp.quantity}
                onChange={(quantity) => field.onChange(
                  [
                    ...(field.value as RecipeProduct[]).filter((rp) => !isEqual(rp, sp)),
                    { product: sp.product, quantity },
                  ],
                )}
              />
              <Name data-tooltip-id={`product-delete${sp.product.id}`}>{sp.product.name}</Name>
              <ReactTooltip
                offset={0}
                id={`product-delete${sp.product.id}`}
                clickable
                delayShow={600}
                style={{ backgroundColor: 'white' }}
              >
                <DeleteIcon onClick={() => field.onChange(
                  (field.value as RecipeProduct[]).filter((rp) => !isEqual(rp, sp)),
                )}
                />
              </ReactTooltip>
            </Container>
          ))}
      </StyledContainer>

    </Container>
  );
};

const QuantityInput: FC<{ value: number | undefined; onChange: (value: number | string) => void }> = (props) => (
  <StyledInput
    type="number"
    value={props.value}
    onChange={(e) => props.onChange(e.target.value ? e.target.value as unknown as number : '')}
  />
);

const StyledInput = styled.input`
   ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  };
  width: 65px;
  height: 40px;
  border: solid 1px pink;
  border-radius: 20px;
  padding: 0 25px 0 5px;
  text-align: center;
  outline: none;
  background-color: pink;
  color: white;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  z-index: 50;
  padding: 0 20px 2px 20px;
  border: solid 1px pink;
  border-radius: 20px;
  background-color: white;
  color: pink;
  margin-left: -30px;
  cursor: pointer;
`;

const StyledContainer = styled(Container)`
  flex-wrap: wrap;
`;

const DeleteIcon = styled(DeleteSvg)`
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

export { ProductsField };
