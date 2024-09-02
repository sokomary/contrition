import React, { FC } from 'react';
import {
  Control,
  useController,
  useFieldArray,
} from 'react-hook-form';
import styled, { css } from 'styled-components';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { DeleteIcon } from 'src/assets';
import i18next from 'src/formatter';
import { Recipe } from 'src/domain';
import {
  Container, Dropdown, FieldError,
} from 'src/components/features';
import { color } from 'src/theme';
import { find } from 'lodash';
import { useQuery } from 'react-query';
import { getProducts } from 'src/api';
import { UseFormRegister } from 'react-hook-form/dist/types/form';

type Props = {
  control: Control<Recipe>;
  register: UseFormRegister<Recipe>;
  onActive: () => void;
  onNewClick: () => void;
};

const ProductsField: FC<Props> = (props) => {
  const { data: products } = useQuery('products', () => getProducts());

  const { fieldState } = useController({
    control: props.control,
    name: 'recipeProducts',
  });

  const {
    fields, append, remove,
  } = useFieldArray({
    control: props.control,
    name: 'recipeProducts',
    rules: {
      validate: (v) => (v as any[]).length !== 0,
    },
  });

  const options = products?.map((p) => ({
    value: p,
    label: p.name,
  }));

  return (
    <ProductsFieldContainer vertical gap={20}>
      <Container vertical gap={20}>
        <Container vertical gap={10}>
          <Container>
            <Label>{i18next.t('domain:recipe.recipeProducts')}</Label>
            <AddProductButton onClick={props.onNewClick}>
              {i18next.t('startpage:recipes.actions.addProduct')}
            </AddProductButton>
          </Container>
          <Dropdown
            onActive={props.onActive}
            options={options || []}
            value={fields.map((rp) => (rp.product))}
            onSelect={(product) => !find(fields, { product }) && append({
              id: undefined as unknown as number, product, quantity: 0,
            })}
          />
          {fieldState.error && <FieldError text={i18next.t('startpage:recipes.errors.products')} />}
        </Container>
      </Container>
      <ProductsContainer gap={5}>
        {fields
          .map((rp, index) => (
            <Container key={rp.product.id} style={{ height: 34 }}>
              <StyledInput
                key={rp.id}
                type="number"
                {...props.register(`recipeProducts.${index}.quantity`)}
              />
              <Name data-tooltip-id={`product-delete${rp.product.id}`}>
                <NameText>{rp.product.name}</NameText>
              </Name>
              <StyledTooltip
                offset={0}
                id={`product-delete${rp.product.id}`}
                clickable
                delayShow={600}
              >
                <StyledDeleteIcon onClick={() => remove(index)} />
              </StyledTooltip>
            </Container>
          ))}
      </ProductsContainer>
    </ProductsFieldContainer>
  );
};

const StyledTooltip = styled(ReactTooltip)`
  background-color: ${({ theme }) => color('background', theme)};
  z-index: 150;
`;

const Label = styled.div`
  font-size: 16px;
  color: ${({ theme }) => color('font', theme)};
`;

const AddProductButton = styled.div`
  font-size: 16px;
  color: ${({ theme }) => color('primary', theme)};
  cursor: pointer;
  align-self: center;
`;

const ProductsContainer = styled(Container)`
  flex-wrap: wrap;
  height: fit-content;
  max-width: 400px;
  ${({ theme }) => ['ipadv'].includes(theme.screen) && css`
    max-height: 115px;
    overflow-y: scroll;
  `}
  ${({ theme }) => ['ipadh'].includes(theme.screen) && css`
    max-height: 248px;
    overflow-y: scroll;
  `}
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
  font-size: 16px;
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

  ${({ theme }) => !['mac'].includes(theme.screen) && css`
    margin: 0;
    width: 100%;
    padding: 10px;
  `};
  
  ${({ theme }) => ['ipadh'].includes(theme.screen) && css`
    padding: 0;
  `};
`;

export { ProductsField };
