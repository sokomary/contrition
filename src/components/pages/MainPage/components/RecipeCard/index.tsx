import React, { ReactNode, useRef } from 'react';
import { Recipe } from 'src/types/domain';
import { useDeviceScreen } from 'src/theme/useDeviceScreen';
import { IconFavorite, IconLink } from 'src/assets';
import { useToggleModal } from 'src/components/modals';
import { NoImage } from '../../assets';
import { Actions } from './components/Actions';
import { useAuthenticate } from 'src/api';
import { ActionBase } from 'src/components/features';
import { formatNutrient } from 'src/utils';
import * as css from './index.css';

const VISIBLE_TAGS_COUNT = 2;

type Props = {
  recipe: Recipe;
  bottom?: ReactNode;
  small?: boolean;
};

export const RecipeCard = ({ recipe, small = false, bottom }: Props) => {
  const screen = useDeviceScreen();
  const displayInfo = screen !== 'iphone' && !small;

  const user = useAuthenticate();

  const visibleTags = recipe.tags.slice(0, VISIBLE_TAGS_COUNT);
  const restTagsCount = recipe.tags.length - 2;

  const { open } = useToggleModal('recipe-info', recipe.id.toString());

  const ref = useRef<HTMLImageElement>(null);

  return (
    <article
      className={css.card({ displayInfo })}
      data-tooltip-id={`recipe-${recipe.id}`}
    >
      <div className={css.container}>
        <div className={css.content({ displayInfo, small })}>
          {recipe.favorite && <IconFavorite className={css.favoriteIcon} />}

          {!displayInfo && (
            <div className={css.calories}>
              {typeof recipe.calories === 'number'
                ? recipe.calories.toFixed(0)
                : '—'}
            </div>
          )}

          <img
            alt='recipe'
            className={css.img}
            ref={ref}
            onError={() => {
              if (ref.current) {
                ref.current.src = NoImage;
              }
            }}
            src={recipe.pressignedUrl || NoImage}
            onClick={open}
          />

          <div className={css.recipeNameContainer}>
            <div>
              <h5 className={css.recipeName}>{recipe.name}</h5>
              {recipe.link.length > 1 && (
                <ActionBase
                  as='a'
                  startGraphic={<IconLink />}
                  href={recipe.link}
                />
              )}
            </div>
          </div>
        </div>

        {bottom}

        {displayInfo && (
          <div className={css.info}>
            <div className={css.infoFirstPart}>
              <div className={css.bigElement}>
                {formatNutrient(recipe.calories)}
              </div>

              <div className={css.infoFooter}>
                <div className={css.elements}>
                  <div className={css.element}>
                    {formatNutrient(recipe.protein)}
                  </div>
                  <div className={css.element}>
                    {formatNutrient(recipe.fats)}
                  </div>
                  <div className={css.element}>
                    {formatNutrient(recipe.carbohydrates)}
                  </div>
                </div>
                <ul className={css.tags}>
                  {visibleTags.map((t) => (
                    <li className={css.tag} key={t.id}>
                      #{t.name}
                    </li>
                  ))}
                  {restTagsCount > 0 && (
                    <li className={css.restTagsCount}>+{restTagsCount}</li>
                  )}
                </ul>
              </div>
            </div>

            {user.id === recipe.ownerId && <Actions recipe={recipe} />}
          </div>
        )}
      </div>
    </article>
  );
};
