import React, { useRef } from 'react';
import { Recipe, isAdmin } from 'src/domain';
import { useAuthenticate } from 'src/hooks';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';
import { Link } from 'react-router-dom';
import { FavoriteIcon, LinkIcon } from 'src/assets';
import { NoImage } from '../../assets';
import { Actions } from './components/Actions';
import * as css from './RecipeCard.css';

const VISIBLE_TAGS_COUNT = 2;

type Props = {
  recipe: Recipe;
  className?: string;
  onEditClick: () => void;
  onViewClick: () => void;
  displayInfo?: boolean;
  small?: boolean;
  onRecipeInfoOpenChange: (open: boolean) => void;
};

export const RecipeCard = ({
  className, recipe, onViewClick, onRecipeInfoOpenChange, onEditClick, displayInfo = true, small,
}: Props) => {
  const visibleTags = recipe.tags.slice(0, VISIBLE_TAGS_COUNT);
  const restTagsCount = recipe.tags.length - 2;

  const user = useAuthenticate();

  const screen = useDeviceScreen();
  const localDisplayInfo = displayInfo && !(['iphone', 'ipadh', 'ipadv'].includes(screen)) && !small;

  const changeRecipeInfoOpen = (open: boolean) => {
    onRecipeInfoOpenChange(open);
    onViewClick();
  };

  const ref = useRef<HTMLImageElement>(null);

  return (
    <div className={`${className} ${css.card({ small, displayInfo: localDisplayInfo })}`}>

      <div className={css.container}>

        <div className={css.content({ displayInfo: localDisplayInfo })}>
          {recipe.favorite && <FavoriteIcon className={css.favoriteIcon} />}
          {!localDisplayInfo && <div className={css.calories}>{recipe.calories.toFixed(0)}</div>}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <img
            alt="recipe"
            className={css.img}
            ref={ref}
            onError={() => {
              if (ref.current) {
                ref.current.src = NoImage;
              }
            }}
            src={recipe.pressignedUrl || NoImage}
            onClick={() => changeRecipeInfoOpen(true)}
          />
          <div className={css.recipeNameContainer}>
            <div>
              <div className={css.recipeName}>{recipe.name}</div>
              {recipe.link.length > 1 && (
              <Link className={css.link} to={recipe.link}><LinkIcon className={css.linkIcon} /></Link>
              )}
            </div>
          </div>
        </div>

        {localDisplayInfo && (
          <div className={css.info}>
            <div className={css.infoFirstPart}>
              <div className={css.bigElement}>
                {recipe.calories.toFixed(recipe.calories % 1 > 0 ? 0 : undefined)}
              </div>

              <div className={css.infoFooter}>
                <div className={css.elements}>
                  <div className={css.element}>
                    {recipe.protein.toFixed(recipe.protein % 1 > 0 ? 0 : undefined)}
                  </div>
                  <div className={css.element}>
                    {recipe.fats.toFixed(recipe.fats % 1 > 0 ? 0 : undefined)}
                  </div>
                  <div className={css.element}>
                    {recipe.carbohydrates.toFixed(recipe.carbohydrates % 1 > 0 ? 0 : undefined)}
                  </div>
                </div>
                <div className={css.tags}>
                  {visibleTags.map((t) => (
                    <div className={css.tag} key={t.id}>
                      #
                      {t.name}
                    </div>
                  ))}
                  {restTagsCount > 0 && (
                  <div className={css.restTagsCount}>
                    +
                    {restTagsCount}
                  </div>
                  )}
                </div>
              </div>
            </div>
            {isAdmin(user) && <Actions recipe={recipe} onEditClick={onEditClick} />}
          </div>
        )}
      </div>
    </div>
  );
};