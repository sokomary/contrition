import React, { FC, useMemo } from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getProducts, getTags } from 'src/api';
import { Recipe } from 'src/types/domain';
import { ControlCard } from './components/ControlCard';
import { RecipeCard } from '../RecipeCard';
import * as css from './RecipesInfo.css';

type Props = {
  open?: boolean;
  recipes: Recipe[];
};

export const RecipesInfo: FC<Props> = ({ recipes, open }) => {
  const { data: tags, isLoading: areTagsLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getTags(),
  });
  const { data: products, isLoading: areProductsLoading } = useSuspenseQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  });

  const favoriteRecipes = useMemo(
    () => recipes?.filter((r) => r.favorite),
    [recipes]
  );

  return (
    <div style={{ overflow: 'hidden' }}>
      <div className={css.animated({ open })}>
        <div className={css.infoContainer}>
          <div className={css.controlsContainer}>
            <ControlCard
              type="tag"
              items={tags || []}
              className={css.tagsControlCard}
              isLoading={areTagsLoading}
            />
            <ControlCard
              type="product"
              items={products || []}
              className={css.productsControlCard}
              isLoading={areProductsLoading}
            />
          </div>

          <div className={css.favoritesControlCard}>
            <div className={css.controlName}>
              <div>Избранные рецепты</div>
              <div className={css.dotsDivider} />
              <div>
                {favoriteRecipes?.length || 'пока нет избранных рецептов'}
              </div>
            </div>

            <div className={css.recipesList}>
              {favoriteRecipes?.map((recipe) => (
                <RecipeCard
                  small
                  key={recipe.id}
                  recipe={recipe}
                  displayInfo={false}
                  className={css.styledRecipeCard}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
