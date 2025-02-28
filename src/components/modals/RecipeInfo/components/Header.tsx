import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from 'src/types/domain';
import { LinkIcon } from 'src/assets';
import * as css from './Header.css';

type Props = {
  recipe: Recipe;
};

export const Header = ({ recipe }: Props) => (
  <div className={css.container}>
    <div className={css.content}>
      <div className={css.name}>{recipe.name}</div>

      {!!recipe.link.length && (
        <Link className={css.link} to={recipe.link}>
          <LinkIcon className={css.icon} />
        </Link>
      )}
    </div>

    <div className={css.content}>
      {(['calories', 'protein', 'fats', 'carbohydrates'] as const).map(
        (field, index) => (
          <div key={index} className={css.element}>
            {recipe[field].toFixed(recipe[field] % 1 > 0 ? 0 : undefined)}
          </div>
        )
      )}
    </div>
  </div>
);
