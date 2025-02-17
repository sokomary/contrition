import React from 'react';
import { RecipeProduct } from 'src/types/domain';
import * as css from './Products.css';

type Props = {
  products: RecipeProduct[];
};

export const Products = ({ products }: Props) => (
  <div className={css.container}>
    <div className={css.title}>Список продуктов:</div>

    {products
      .sort((a, b) => (b.quantity < a.quantity ? -1 : 1))
      .map((product) => (
        <div key={product.id}>
          {product.product.name} - {product.quantity}
        </div>
      ))}
  </div>
);
