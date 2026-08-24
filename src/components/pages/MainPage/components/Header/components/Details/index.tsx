import React, { FC } from 'react';
import { Recipe } from 'src/types/domain';
import { Products } from './components/Products';
import { Tags } from './components/Tags';
import { Favorites } from './components/Favorites';
import * as css from './index.css';

type Props = {
  recipes: Recipe[];
};

export const Details: FC<Props> = ({ recipes }) => (
  <div>
    <div className={css.content}>
      <div className={css.controls}>
        <Tags />
        <Products />
      </div>

      <Favorites recipes={recipes} />
    </div>
  </div>
);
