import React, {
  FC, useMemo, useState,
} from 'react';
import { useQuery } from 'react-query';
import { getProducts, getTags } from 'src/api';
import { Recipe, Product } from 'src/domain';
import { AddProduct, AddTag, ProductInfo } from 'src/components/modals';
import * as css from './RecipesInfo.css';
import { ControlCard } from './components/ControlCard';
import { RecipeCard } from '../RecipeCard';

type Props = {
  open?: boolean;
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
  onViewClick: (recipe: Recipe) => void;
  onRecipeInfoOpenChange: (open: boolean) => void;
};

export const RecipesInfo: FC<Props> = ({
  recipes, open, onViewClick, onRecipeClick, onRecipeInfoOpenChange,
}) => {
  const [productToView, setProductToView] = useState<Product | undefined>(undefined);
  const [openNewProduct, setOpenNewProduct] = useState(false);
  const [openNewTag, setOpenNewTag] = useState(false);

  const { data: tags, isLoading: areTagsLoading } = useQuery('tags', () => getTags());
  const { data: products, isLoading: areProductsLoading } = useQuery(
    ['products'],
    () => getProducts(),
    { keepPreviousData: true, suspense: true },
  );

  const favoriteRecipes = useMemo(() => (
    recipes?.filter((r) => r.favorite)
  ), [recipes]);

  return (
    <div style={{ overflow: 'hidden' }}>

      <div className={css.animated({ open })}>
        <AddTag
          open={openNewTag}
          onClose={() => setOpenNewTag(false)}
        />
        <AddProduct
          open={openNewProduct}
          onClose={() => setOpenNewProduct(false)}
        />
        {productToView && (
          <ProductInfo onClose={() => setProductToView(undefined)} product={productToView} open={!!productToView} />
        )}

        <div className={css.infoContainer}>
          <div className={css.controlsContainer}>
            <ControlCard
              className={css.tagsControlCard}
              items={tags || []}
              header="Все теги"
              addButtonText="Добавить тег"
              onAddClick={() => setOpenNewTag(true)}
              isLoading={areTagsLoading}
            />
            <ControlCard
              className={css.productsControlCard}
              addButtonText="Добавить продукт"
              onOpenClick={(item) => {
                setProductToView(products?.find((p) => p.id === item.id));
              }}
              items={products || []}
              header="Все продукты"
              onAddClick={() => setOpenNewProduct(true)}
              isLoading={areProductsLoading}
            />
          </div>

          <div className={css.favoritesControlCard}>
            <div className={css.controlName}>
              <div>Избранные рецепты</div>
              <div className={css.dotsDivider} />
              <div>{favoriteRecipes?.length || 'пока нет избранных рецептов'}</div>
            </div>
            <div className={css.recipesList}>
              {favoriteRecipes?.map((r) => (
                <RecipeCard
                  small
                  key={r.id}
                  className={css.styledRecipeCard}
                  recipe={r}
                  onRecipeInfoOpenChange={onRecipeInfoOpenChange}
                  onEditClick={() => onRecipeClick(r)}
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
