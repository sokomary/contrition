import React, { FC } from 'react';
import { Recipe } from 'src/types/domain';
import { Products } from './components/Products';
import { Tags } from './components/Tags';
import { Favorites } from './components/Favorites';
import * as css from './index.css';

type Props = {
  recipes: Recipe[];
  open: boolean;
};

export const Details: FC<Props> = ({ recipes, open }) => (
  <div className={css.wrapper({ open })}>
    <div className={css.inner}>
      <div className={css.content}>
        <div className={css.controls}>
          <Tags />
          <Products />
        </div>

        <Favorites recipes={recipes} />
      </div>
    </div>
  </div>
);
