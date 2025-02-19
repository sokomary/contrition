import React, { FC, useMemo, useState } from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getProducts, getTags } from 'src/api';
import { Recipe, Product } from 'src/types/domain';
import { ProductInfo } from 'src/components/modals';
import { ControlCard } from './components/ControlCard';
import { RecipeCard } from '../RecipeCard';
import * as css from './RecipesInfo.css';

type Props = {
  open?: boolean;
  recipes: Recipe[];
  onViewClick: (recipe: Recipe) => void;
  onRecipeInfoOpenChange: (open: boolean) => void;
};

export const RecipesInfo: FC<Props> = ({
  recipes,
  open,
  onViewClick,
  onRecipeInfoOpenChange,
}) => {
  const [productToView, setProductToView] = useState<Product | undefined>(
    undefined
  );

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
        {productToView && (
          <ProductInfo
            onClose={() => setProductToView(undefined)}
            product={productToView}
            open={!!productToView}
          />
        )}

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
              onOpenClick={(item) => {
                setProductToView(products?.find((p) => p.id === item.id));
              }}
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
              {favoriteRecipes?.map((r) => (
                <RecipeCard
                  small
                  key={r.id}
                  className={css.styledRecipeCard}
                  recipe={r}
                  onRecipeInfoOpenChange={onRecipeInfoOpenChange}
                  onViewClick={() => onViewClick(r)}
                  displayInfo={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
