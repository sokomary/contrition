import React from 'react';
import { useTranslation } from 'react-i18next';
import { RecipeProduct } from 'src/types/domain';
import { CrossOutAble } from 'src/components/features';
import * as css from './Products.css';

type Props = {
  products: RecipeProduct[];
};

export const Products = ({ products }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={css.container}>
      <div className={css.title}>{t('domain.recipe.recipeProducts')}</div>

      <div className={css.content}>
        {products.map(({ id, quantity, product }) => (
          <div className={css.product} key={id}>
            <span className={css.quantity}>{quantity}</span>
            <div className={css.divider}>|</div>
            <div className={css.name}>
              <CrossOutAble content={product.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
