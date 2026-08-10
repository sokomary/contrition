import React, { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { RecipeProduct } from 'src/types/domain';
import { CrossOutAble } from 'src/components/features';
import * as css from './Products.css';

type Props = {
  products: RecipeProduct[];
};

export const Products = ({ products }: Props) => {
  const { t } = useTranslation();
  const titleId = useId();

  return (
    <section className={css.container} aria-labelledby={titleId}>
      <h3 className={css.title} id={titleId}>
        {t('domain.recipe.recipeProducts')}
      </h3>

      <div className={css.content}>
        {products.map(({ id, quantity, product }) => (
          <div className={css.product} key={id}>
            <span className={css.quantity}>{quantity}</span>
            <span className={css.divider} aria-hidden='true'>
              |
            </span>
            <div className={css.name}>
              <CrossOutAble content={product.name} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
