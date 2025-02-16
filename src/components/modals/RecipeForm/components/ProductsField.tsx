import React, { FC } from 'react';
import { Control, useController, useFieldArray } from 'react-hook-form';
import i18next from 'src/formatter';
import { Recipe } from 'src/types/domain';
import { Button, Dropdown, FieldError } from 'src/components/features';
import { find } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from 'src/api';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { Tooltip } from 'react-tooltip';
import { DeleteIcon } from 'src/assets';
import * as css from './ProductsField.css';

type Props = {
  control: Control<Recipe>;
  register: UseFormRegister<Recipe>;
  onNewClick: () => void;
};

export const ProductsField: FC<Props> = (props) => {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  });

  const { fieldState } = useController({
    control: props.control,
    name: 'recipeProducts',
  });

  const { fields, append, remove } = useFieldArray({
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
    <div className={css.productsFieldContainer}>
      <div className={css.header}>
        <div className={css.container}>
          <div className={css.label}>
            {i18next.t('domain:recipe.recipeProducts')}
          </div>
          <Button
            className={css.button}
            kind="ghost"
            onClick={props.onNewClick}
          >
            {i18next.t('startpage:recipes.actions.addProduct')}
          </Button>
        </div>
        <Dropdown
          options={options || []}
          value={fields.map((rp) => rp.product)}
          onSelect={(product) =>
            !find(fields, { product }) &&
            append({
              id: undefined as unknown as number,
              product,
              quantity: 0,
            })
          }
        />
        {fieldState.error && (
          <FieldError text={i18next.t('startpage:recipes.errors.products')} />
        )}
      </div>
      <div className={css.products}>
        {fields.map((rp, index) => (
          <div className={css.product} key={rp.product.id}>
            <input
              className={css.input}
              key={rp.id}
              type="number"
              {...props.register(`recipeProducts.${index}.quantity`)}
            />
            <div
              className={css.name}
              data-tooltip-id={`product-delete${rp.product.id}`}
            >
              <div className={css.nameText}>{rp.product.name}</div>
            </div>
            <Tooltip
              className={css.tooltip}
              offset={0}
              id={`product-delete${rp.product.id}`}
              clickable
              delayShow={600}
            >
              <DeleteIcon className={css.icon} onClick={() => remove(index)} />
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};
