import React, { FC, useMemo, useState } from 'react';
import { useController, UseControllerProps, useWatch } from 'react-hook-form';
import { isEqual } from 'lodash';
import styled from 'styled-components';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { DeleteIcon } from 'src/assets';
import i18next from 'src/formatter';
import { Recipe, RecipeProduct, Product } from 'src/domain';
import {
  DropdownField, FieldError, Container,
} from 'src/components/features';
import { AddProduct } from 'src/components/dialogs';
import { color } from 'src/theme';

type Props = UseControllerProps<Recipe> & {
  products: Product[];
  onActive: () => void;
  setValue: (name: any, value: any) => void;
};

const ProductsField: FC<Props> = (props) => {
  const [openNewProduct, setOpenNewProduct] = useState(false);

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

  const selectedProducts = useWatch({
    control: props.control,
    name: 'recipeProducts',
  });

  return (
    <>
      <AddProduct
        open={openNewProduct}
        onClose={() => setOpenNewProduct(false)}
      />
      <ProductsFieldContainer vertical gap={20}>
        <Container vertical gap={20}>
          <Container vertical gap={5}>
            <Container>
              <Label>{i18next.t('domain:recipe.recipeProducts')}</Label>
              <AddProductButton onClick={() => setOpenNewProduct(true)}>
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
        <ProductsContainer gap={5}>
          {selectedProducts?.sort((rp1, rp2) => (rp1.product.id > rp2.product.id ? 1 : -1))
            .map((sp) => (
              <Container key={sp.product.id} style={{ height: 34 }}>
                <QuantityInput
                  value={sp.quantity}
                  onChange={(quantity) => props.setValue(
                    'recipeProducts',
                    [
                      ...selectedProducts.filter((rp) => !isEqual(rp, sp)),
                      { id: sp.id, product: sp.product, quantity: parseInt(quantity.toString(), 10) },
                    ],
                  )}
                />
                <Name data-tooltip-id={`product-delete${sp.product.id}`}><NameText>{sp.product.name}</NameText></Name>
                <StyledTooltip
                  offset={0}
                  id={`product-delete${sp.product.id}`}
                  clickable
                  delayShow={600}
                >
                  <StyledDeleteIcon
                    onClick={() => props.setValue(
                      'recipeProducts',
                      (selectedProducts as RecipeProduct[]).filter((rp) => !isEqual(rp, sp)),
                    )}
                  />
                </StyledTooltip>
              </Container>
            ))}
        </ProductsContainer>
      </ProductsFieldContainer>
    </>

  );
};

const StyledTooltip = styled(ReactTooltip)`
  background-color: ${({ theme }) => color('background', theme)};
  z-index: 150;
`;

const QuantityInput: FC<{ value: number | undefined; onChange: (value: number | string) => void }> = (props) => (
  <StyledInput
    type="number"
    value={props.value}
    onChange={(e) => props.onChange(e.target.value ? e.target.value as unknown as number : '')}
  />
);

const Label = styled.div`
  font-size: 17px;
  color: ${({ theme }) => color('font', theme)};
`;

const AddProductButton = styled.div`
  font-size: 14px;
  color: ${({ theme }) => color('accent', theme)};
  cursor: pointer;
  align-self: center;
`;

const ProductsContainer = styled(Container)`
  flex-wrap: wrap;
  height: fit-content;
  max-width: 400px;
`;

const StyledInput = styled.input`
   ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  };
  width: 65px;
  height: 34px;
  border: none;
  border-radius: 25px;
  padding: 0 25px 0 5px;
  text-align: center;
  outline: none;
  background-color: ${({ theme }) => color('secondary', theme)};
  color: ${({ theme }) => color('primary', theme)};
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 20px 2px 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => color('accent-light', theme)};
  color: ${({ theme }) => color('accent', theme)};
  margin-left: -30px;
  cursor: pointer;
  
  max-width: 280px;
`;

const NameText = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  cursor: pointer;
  width: 15px;
  height: 15px;
`;

const ProductsFieldContainer = styled(Container)`
  padding: 0 20px;
  width: 35%;
  @media (max-width: 1120px) {
    margin: 0;
    width: 340px;
    padding: 10px;
  }
`;

export { ProductsField };
