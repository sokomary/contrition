import React from 'react';
import { RecipeProduct } from 'src/types/domain';
import { CrossOutAble } from 'src/components/features';
import * as css from './Products.css';

type Props = {
  products: RecipeProduct[];
  header?: boolean;
};

export const Products = ({ products, header }: Props) => (
  <div className={css.container}>
    {header && <div className={css.title}>Список продуктов:</div>}

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
