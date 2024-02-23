import React, {
  CSSProperties, FC, useMemo, useState,
} from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from 'react-query';
import { getProducts, getTags } from 'src/api';
import {
  Loading, Container,
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

      <InfoContainer>
        <ControlsContainer vertical gap={20}>
          <TagsControlCard
            items={tags || []}
            header="Все теги"
            addButtonText="Добавить тег"
            onAddClick={() => setOpenNewTag(true)}
            isLoading={areTagsLoading}
          />
          <ProductsControlCard
            addButtonText="Добавить продукт"
            onOpenClick={(item) => {
              setProductToView(products?.find((p) => p.id === item.id));
            }}
            items={products || []}
            header="Все продукты"
            onAddClick={() => setOpenNewProduct(true)}
            isLoading={areProductsLoading}
          />
        </ControlsContainer>

        <FavoritesControlCard vertical gap={20}>
          <ControlName gap={10}>
            <div>Избранные рецепты</div>
            <DotsDivider />
            <div>{favoriteRecipes?.length || 'пока нет избранных рецептов'}</div>
          </ControlName>
          <RecipesList>
            {favoriteRecipes?.map((r) => (
              <StyledRecipeCard
                small
                key={r.id}
                onEditClick={onRecipeClick}
                displayInfo={false}
                recipe={r}
              />
            ))}
          </RecipesList>
        </FavoritesControlCard>
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
  addButtonText: string;
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
      <Container>
        <ControlName gap={10}>
          <div>{props.header}</div>
          <DotsDivider />
          <div>{props.items.length}</div>
          {props.isLoading && <Loading />}
        </ControlName>
        <ControlAddButton onClick={props.onAddClick}>{props.addButtonText}</ControlAddButton>
      </Container>
      <ItemsList gap={6}>
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
    </ControlContent>
  </Control>
);

const InfoContainer = styled(Container)`
  padding: 0 40px;
  width: 100%;
  gap: 20px;

  ${({ theme }) => ['ipadv', 'ipadh'].includes(theme.screen) && css`
    padding: 0 20px;
    gap: 10px;
  `};

  ${({ theme }) => theme.screen === 'iphone' && css`
    flex-direction: column;
    height: fit-content;
    padding: 0 15px;
    gap: 15px;
  `};
`;

const ControlsContainer = styled(Container)`
  height: 100%;
  width: 30%;
  min-width: 200px;
  flex-shrink: 0;
  
  ${({ theme }) => theme.screen === 'ipadh' && css`
    width: 60%;
    height: 240px;
    flex-direction: row;
    gap: 10px;
  `};
  
  ${({ theme }) => theme.screen === 'ipadv' && css`
    width: 50%;
    gap: 10px;
  `};

  ${({ theme }) => theme.screen === 'iphone' && css`
    flex-direction: column;
    width: 100%;
    gap: 15px;
  `};
`;

const TagsControlCard = styled(ControlCard)`
  background-color:${({ theme }) => color('favorite', theme)};

  ${({ theme }) => ['ipadh'].includes(theme.screen) && css`
    height: 100%;
    max-width: 260px;
  `};
`;

const ProductsControlCard = styled(ControlCard)`
  background-color: ${({ theme }) => color('accent-light', theme)};
  height: 231px;
  
  ${({ theme }) => ['ipadh'].includes(theme.screen) && css`
    height: 100%;
  `};
  
  ${({ theme }) => ['ipadv'].includes(theme.screen) && css`
    height: 142px;
  `};
  
  ${({ theme }) => theme.screen === 'iphone' && css`
    height: 174px;
  `};
`;

const FavoritesControlCard = styled(Container)`
  width: calc(70% - 20px);
  flex-shrink: 0;
  border-radius: 20px;
  background: ${({ theme }) => color('basic', theme)};
  padding: 15px 15px 0 15px;
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
  height: 340px;

  ${({ theme }) => theme.screen === 'ipadh' && css`
    height: 240px;
    width: calc(40% - 10px);
  `};
  
  ${({ theme }) => theme.screen === 'ipadv' && css`
    width: calc(50% - 10px);
    height: 240px;
  `};
  
  ${({ theme }) => theme.screen === 'iphone' && css`
    width: 100%;
    height: 242px;
  `};
`;

const RecipesList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 20px;
  width: 100%;
  max-width: 100%;
  ::-webkit-scrollbar {
    background-color: transparent;
  }
`;

const Control = styled.div`
  width: 100%;
  border-radius: 20px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const ControlContent = styled(Container)`
  flex-direction: column;
  gap: 10px;
  height: 100%;

  ${({ theme }) => theme.screen === 'ipadh' && css`
    justify-content: flex-start;
  `};
`;

const ControlName = styled(Container)`
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => color('label', theme)};
`;

const ControlAddButton = styled(Container)`
  cursor: pointer;
  font-size: 16px;
  color: ${({ theme }) => color('primary', theme)};
`;

const ItemsList = styled(Container)`
  flex-wrap: wrap;
  row-gap: 10px;
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    background-color: transparent;
  };

  ${({ theme }) => theme.screen === 'ipadh' && css`
    justify-content: flex-start;
    align-items: flex-start;
    height: fit-content;
    max-height: 100%;
    gap: 10px;
  `};
`;

const ItemName = styled(Container)<{ actionable: boolean }>`
  height: 30px;
  border-radius: 20px;
  padding: 2px 12px 4px 12px;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => color('font', theme)};
  background-color: ${({ theme }) => color('basic', theme)};
  ${({ actionable }) => (actionable ? 'cursor: pointer' : '')};
`;

const DotsDivider = styled.div`
  width: 5px; 
  height: 5px;
  border-radius: 2.5px;
  background-color:${({ theme }) => color('label', theme)};
  margin-top: 2px;
`;
