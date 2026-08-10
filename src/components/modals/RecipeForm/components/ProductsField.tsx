import React, { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionBar, Dropdown, FieldError } from 'src/components/features';
import { Tooltip } from 'react-tooltip';
import { IconDelete } from 'src/assets';
import { Options, useLogic } from './ProductsField.useLogic';
import * as css from './ProductsField.css';

export const ProductsField = (props: Options) => {
  const { t } = useTranslation();
  const { actions, options, remove, onSelect, fields, error, value } =
    useLogic(props);
  const labelId = useId();

  return (
    <section className={css.container} aria-labelledby={labelId}>
      <div className={css.field}>
        <div className={css.header}>
          <h3 className={css.label} id={labelId}>
            {t('domain.recipe.recipeProducts')}
          </h3>
          <ActionBar actions={actions} />
        </div>

        <Dropdown options={options || []} value={value} onSelect={onSelect} />
        {error && <FieldError text={t('startpage.recipes.errors.products')} />}
      </div>

      <ul className={css.products}>
        {fields.map(({ product, id }, index) => (
          <li className={css.product} key={product.id}>
            <input
              key={id}
              type='number'
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
              <IconDelete className={css.icon} onClick={() => remove(index)} />
            </Tooltip>
          </li>
        ))}
      </ul>
    </section>
  );
};
