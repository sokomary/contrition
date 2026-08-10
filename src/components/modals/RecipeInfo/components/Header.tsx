import React from 'react';
import { Recipe } from 'src/types/domain';
import { IconLink } from 'src/assets';
import { ActionBase } from 'src/components/features';
import * as css from './Header.css';

type Props = {
  recipe: Recipe;
};

export const Header = ({ recipe }: Props) => (
  <div className={css.container}>
    <div className={css.content}>
      <h2 className={css.name}>{recipe.name}</h2>

      {!!recipe.link.length && (
        <ActionBase as='a' startGraphic={<IconLink />} href={recipe.link} />
      )}
    </div>

    <ul className={css.content}>
      {(['calories', 'protein', 'fats', 'carbohydrates'] as const).map(
        (field, index) => (
          <li key={index} className={css.element}>
            {recipe[field].toFixed(recipe[field] % 1 > 0 ? 0 : undefined)}
          </li>
        ),
      )}
    </ul>
  </div>
);
