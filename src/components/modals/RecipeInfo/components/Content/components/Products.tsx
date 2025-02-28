import React from 'react';
import { RecipeProduct } from 'src/types/domain';
import * as css from './Products.css';

type Props = {
  products: RecipeProduct[];
};

export const Products = ({ products }: Props) => (
  <div className={css.container}>
    <div className={css.title}>Состав</div>

    <div className={css.content}>
      {products.map(({ id, quantity, product }) => (
        <div className={css.product} key={id}>
          <span className={css.quantity}>{quantity}</span>
          <div className={css.divider}>|</div>
          <div className={css.name}>{product.name}</div>
        </div>
      ))}
    </div>
  </div>
);
