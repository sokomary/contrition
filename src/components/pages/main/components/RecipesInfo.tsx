import React, {
  CSSProperties, FC, useMemo, useState,
} from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getProducts, getTags } from 'src/api';
import {
  Loading, Container, Button,
} from 'src/components/features';
import { Recipe, Product } from 'src/domain';
import { AddTag, AddProduct, ProductInfo } from 'src/components/dialogs';
import { color } from 'src/theme';
import { RecipeCard } from './RecipeCard';

type Props = {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
};

export const RecipesInfo: FC<Props> = ({ recipes, onRecipeClick }) => {
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
    <>
      <AddTag
        open={openNewTag}
        onClose={() => setOpenNewTag(false)}
      />
      <AddProduct
        open={openNewProduct}
        onClose={() => setOpenNewProduct(false)}
      />
      {productToView
        && <ProductInfo onClose={() => setProductToView(undefined)} product={productToView} open={!!productToView} />}

      <InfoContainer gap={20}>
        <ControlsContainer vertical gap={20}>
          <TagsControlCard
            items={tags || []}
            header="Все теги"
            onAddClick={() => setOpenNewTag(true)}
            isLoading={areTagsLoading}
          />
          <ProductsControlCard
            onOpenClick={(item) => {
              setProductToView(products?.find((p) => p.id === item.id));
            }}
            items={products || []}
            header="Все продукты"
            onAddClick={() => setOpenNewProduct(true)}
            isLoading={areProductsLoading}
          />
        </ControlsContainer>

        <FavoritesContainer vertical gap={20}>
          <ControlHeader gap={10}>
            <div>Избранные рецепты</div>
            <DotsDivider />
            <div>{favoriteRecipes?.length || 'пока нет избранных рецептов'}</div>
          </ControlHeader>
          <RecipesList>
            {favoriteRecipes?.map((r) => (
              <div key={r.id} style={{ justifySelf: 'center' }}>
                <StyledRecipeCard
                  displayInfo={false}
                  recipe={r}
                  onDialogOpen={onRecipeClick}
                />
              </div>
            ))}
          </RecipesList>
        </FavoritesContainer>
      </InfoContainer>
    </>
  );
};

const StyledRecipeCard = styled(RecipeCard)`
  background-color: ${({ theme }) => color('favorite', theme)}; 
  box-shadow: none;
`;

type ControlCardItem = {
  id: number;
  name: string;
};
const ControlCard: FC<{
  header: string;
  items: ControlCardItem[];
  onAddClick: () => void;
  onOpenClick?: (item: { id: number }) => void;
  isLoading: boolean;
  style?: CSSProperties;
  className?: string;
}> = (props) => (
  <Control style={props.style} className={props.className}>
    <ControlContent>
      <ControlHeader gap={10}>
        <div>{props.header}</div>
        <DotsDivider />
        <div>{props.items.length}</div>
        {props.isLoading && <Loading />}
      </ControlHeader>
      <ItemsList gap={5}>
        {props.items.map((t, i) => (
          <ItemName
            actionable={!!props.onOpenClick}
            onClick={() => props.onOpenClick && props.onOpenClick(t)}
            key={i}
          >
            {t.name}
          </ItemName>
        ))}
      </ItemsList>
      <ControlActions>
        <Button onClick={props.onAddClick}>Добавить</Button>
      </ControlActions>
    </ControlContent>
  </Control>
);

const InfoContainer = styled(Container)`
  height: 380px;
  padding: 0 40px;
  width: 100%;
  @media (max-width: 960px) {
   flex-direction: column;
   height: fit-content;
  }
`;

const ControlsContainer = styled(Container)`
  width: 30%;
  min-width: 200px;
  height: 100%;
  flex-shrink: 0;
  @media (max-width: 960px) {
    flex-direction: row;
    width: 100%;
  }
  @media (max-width: 540px) {
    flex-direction: column;
    width: 100%;
  }
`;

const FavoritesContainer = styled(Container)`
  height: 100%;
  width: calc(70% - 20px);
  flex-shrink: 0;
  border-radius: 20px;
  background: ${({ theme }) => color('basic', theme)};
  padding: 20px 20px 0 20px;
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
  @media (max-width: 960px) {
    width: 100%;
  }
`;

const RecipesList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 20px;
  width: 100%;
  max-width: 100%;
  padding-bottom: 20px;
`;

const TagsControlCard = styled(ControlCard)`
  background-color:${({ theme }) => color('favorite', theme)};
  height: 160px;
  min-height: 160px;

  @media (max-width: 960px) {
    height: 180px;
  }
`;

const ProductsControlCard = styled(ControlCard)`
  background-color: ${({ theme }) => color('accent-light', theme)};
  height: 200px;
  @media (max-width: 960px) {
    height: 180px;
  }
`;

const Control = styled.div`
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ControlContent = styled(Container)`
  gap: 10px;
  flex-direction: column;
  height: 100%;
`;

const ControlHeader = styled(Container)`
  color:${({ theme }) => color('label', theme)};
  align-items: center;
  font-size: 20px;
`;

const ItemsList = styled(Container)`
  flex-wrap: wrap;
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    background-color: transparent;
  }
`;

const ControlActions = styled(Container)`
  justify-content: flex-end;
`;

const ItemName = styled(Container)<{ actionable: boolean }>`
  height: 30px;
  align-items: center;
  border-radius: 20px;
  background-color: ${({ theme }) => color('background', theme)};
  color: ${({ theme }) => color('accent', theme)};
  padding: 0 12px;
  font-size: 17px;
  ${({ actionable }) => (actionable ? 'cursor: pointer' : '')};
`;

const DotsDivider = styled.div`
  width: 6px; 
  height: 6px;
  border-radius: 3px;
  background-color:${({ theme }) => color('label', theme)};
  margin-top: 2px;
`;
