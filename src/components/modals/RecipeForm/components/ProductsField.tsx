import React from 'react';
import i18next from 'src/formatter';
import { ActionBar, Dropdown, FieldError } from 'src/components/features';
import { Tooltip } from 'react-tooltip';
import { DeleteIcon } from 'src/assets';
import { Options, useLogic } from './ProductsField.useLogic';
import * as css from './ProductsField.css';

export const ProductsField = (props: Options) => {
  const { actions, options, remove, onSelect, fields, error, value } =
    useLogic(props);

  return (
    <div className={css.container}>
      <div className={css.field}>
        <div className={css.header}>
          <div className={css.label}>
            {i18next.t('domain:recipe.recipeProducts')}
          </div>
          <ActionBar className={css.actions} actions={actions} />
        </div>

        <Dropdown options={options || []} value={value} onSelect={onSelect} />
        {error && (
          <FieldError text={i18next.t('startpage:recipes.errors.products')} />
        )}
      </div>

      <div className={css.products}>
        {fields.map(({ product, id }, index) => (
          <div className={css.product} key={product.id}>
            <input
              key={id}
              type="number"
              className={css.input}
              {...props.register(`recipeProducts.${index}.quantity`)}
            />
            <div
              className={css.name}
              data-tooltip-id={`product-delete${product.id}`}
            >
              <div>{product.name}</div>
            </div>

            <Tooltip
              clickable
              offset={0}
              delayShow={600}
              className={css.tooltip}
              id={`product-delete${product.id}`}
            >
              <DeleteIcon className={css.icon} onClick={() => remove(index)} />
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};
