import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from 'src/types/domain';
import { ClearIcon, LinkIcon } from 'src/assets';
import * as css from './Header.css';

type Props = {
  recipe: Recipe;
  onClose?: () => void;
};

export const Header = ({ recipe, onClose }: Props) => (
  <div className={css.header}>
    <div className={css.container}>
      <div className={css.content}>
        <div
          style={{
            alignSelf: 'flex-start',
            marginTop: 3,
            fontWeight: 'medium',
            fontSize: 18,
            width: 'fit-content',
            maxWidth: 260,
          }}
        >
          {recipe.name}
        </div>
        {recipe.link.length > 1 && (
          <Link className={css.link} to={recipe.link}>
            <LinkIcon className={css.icon} />
          </Link>
        )}
      </div>
      {onClose && <ClearIcon style={{ cursor: 'pointer' }} onClick={onClose} />}
    </div>
    <div className={css.content}>
      {(['calories', 'protein', 'fats', 'carbohydrates'] as const).map(
        (field, i) => (
          <div key={i} className={css.element}>
            {recipe[field].toFixed(recipe[field] % 1 > 0 ? 0 : undefined)}
          </div>
        )
      )}
    </div>
  </div>
);
