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
      <h3 className={css.name}>{recipe.name}</h3>

      {!!recipe.link.length && (
        <ActionBase as='a' startGraphic={<IconLink />} href={recipe.link} />
      )}
    </div>
  </div>
);
