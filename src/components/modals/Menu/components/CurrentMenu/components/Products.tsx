import React from 'react';
import { useTranslation } from 'react-i18next';
import { RecipeProduct } from 'src/types/domain';
import { CrossOutAble } from 'src/components/features';
import * as css from './Products.css';

type Props = {
  products: RecipeProduct[];
  header?: boolean;
};

export const Products = ({ products, header }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={css.container}>
      {header && (
        <div className={css.title}>{t('startpage.menu.products.title')}:</div>
      )}

      {products
        .sort((a, b) => (b.quantity < a.quantity ? -1 : 1))
        .map((product) => (
          <div key={product.id}>
            <CrossOutAble
              content={`${product.product.name} - ${product.quantity}`}
            />
          </div>
        ))}
    </div>
  );
};
