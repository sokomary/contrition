import React, {
  CSSProperties, FC, Suspense, useMemo, useState,
} from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getProducts, getRecipes, getTags } from '../../api/api';
import { RecipeDialog } from './dialogs/RecipeDialog';
import { Recipe } from '../../domain/Recipe';
import { Container } from '../ui/Container';
import { GetRandomRecipe } from './dialogs/GetRandomRecipe';
import { RecipeCard } from './RecipeCard';
import { Loading } from '../ui/Loading';
import { ActionBar } from './ActionBar';
import { color } from '../ui/theme';
import { Button } from '../ui/Button';
import { AddTagDialog } from './dialogs/AddTagDialog';
import { AddProductDialog } from './dialogs/AddProductDialog';
import { useAuthenticate } from '../../hooks/useAuthenticate';
import { isAdmin } from '../../domain/User';
import { Product } from '../../domain/Product';
import { ProductPage } from './dialogs/ProductPage';

const StartPage = () => {
  const [open, setOpen] = useState(false);
  const [randomDialogOpen, setRandomDialogOpen] = useState(false);

  const [tagsToFilter, setTagsToFilter] = useState<number[]>([]);
  const [recipeToEdit, setRecipeToEdit] = useState<Recipe | undefined>(undefined);
  const [q, setQ] = useState('');

  const { data: tags, isLoading: isTagsLoading } = useQuery('tags', () => getTags());
  const { data: recipes, isLoading } = useQuery(
    ['recipes', tagsToFilter],
    () => getRecipes(tagsToFilter),
    { keepPreviousData: true, suspense: true },
  );
  const { data: products, isLoading: areProductsLoading } = useQuery(
    ['products'],
    () => getProducts(),
    { keepPreviousData: true, suspense: true },
  );
  const filteredRecipes = useMemo(() => (
    q?.length ? recipes?.filter((r) => r.name.toLowerCase().includes(q.toLowerCase())) : recipes
  ), [q, recipes]);
  const favoriteRecipes = useMemo(() => (
    recipes?.filter((r) => r.favorite)
  ), [recipes]);

  const [openNewProduct, setOpenNewProduct] = useState(false);
  const [openNewTag, setOpenNewTag] = useState(false);
  const [productToView, setProductToView] = useState<Product | undefined>(undefined);

  const user = useAuthenticate();

  return (
    <Page>
      {!isTagsLoading && open && !!tags?.length && (
        <Suspense>
          <RecipeDialog
            key={recipeToEdit?.id || 0}
            tags={tags}
            open={open}
            defaultValues={recipeToEdit}
            onClose={() => {
              setOpen(false);
              setRecipeToEdit(undefined);
            }}
          />
        </Suspense>
      )}

      {!isTagsLoading && !!tags?.length && randomDialogOpen && (
        <GetRandomRecipe
          tags={tags}
          open={randomDialogOpen}
          onClose={() => setRandomDialogOpen(false)}
        />
      )}

      {productToView
          && <ProductPage onClose={() => setProductToView(undefined)} product={productToView} open={!!productToView} />}

      <AddTagDialog
        open={openNewTag}
        onClose={() => setOpenNewTag(false)}
      />
      <AddProductDialog
        open={openNewProduct}
        onClose={() => setOpenNewProduct(false)}
      />

      <Container vertical gap={0}>

        {tags && (
          <ActionBarContainer>
            <ActionBar
              onQueryChange={setQ}
              onTagChange={(selectedTag) => setTagsToFilter(selectedTag ? [selectedTag.id] : [])}
              tags={tags}
              onNewClick={() => setOpen(true)}
              onRandomClick={() => setRandomDialogOpen(true)}
            />
          </ActionBarContainer>
        )}

        {isAdmin(user) && (
          <InfoContainer gap={20}>

            <ControlsContainer vertical gap={20}>
              <TagsControlCard
                items={tags || []}
                header="Все теги"
                onAddClick={() => setOpenNewTag(true)}
                isLoading={isTagsLoading}
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

            <Favorite vertical gap={20}>
              <TagsControlHeader gap={10}>
                <div>Избранные рецепты</div>
                <DotsDivider />
                <div>{favoriteRecipes?.length || 'пока нет избранных рецептов'}</div>
                {isLoading && <Loading />}
              </TagsControlHeader>
              <FavoriteRecipesCards>
                {favoriteRecipes?.map((r) => (
                  <div key={r.id} style={{ justifySelf: 'center' }}>
                    <RecipeCard
                      displayInfo={false}
                      style={{ backgroundColor: color('favorite'), boxShadow: 'none' }}
                      recipe={r}
                      onDialogOpen={(recipe) => {
                        setRecipeToEdit(recipe);
                        setOpen(true);
                      }}
                    />
                  </div>
                ))}
              </FavoriteRecipesCards>
            </Favorite>

          </InfoContainer>
        )}

        <Content>
          {!isLoading
            ? (
              <>
                {recipes?.length ? (
                  <Cards>
                    {filteredRecipes?.map((r: Recipe, i: number) => (
                      <RecipeCard
                        onDialogOpen={(recipe) => {
                          setRecipeToEdit(recipe);
                          setOpen(true);
                        }}
                        key={i}
                        recipe={r}
                      />
                    ))}
                    <FakeCard />
                    <FakeCard />
                    <FakeCard />
                    <FakeCard />
                    <FakeCard />
                  </Cards>
                ) : <NoRecipes>Пока нет рецептов</NoRecipes>}
              </>
            )
            : <ProgressLoading><Loading /></ProgressLoading>}
        </Content>
      </Container>
    </Page>
  );
};

const ControlCard: FC<{
  header: string;
  items: { id: number; name: string }[];
  onAddClick: () => void;
  onOpenClick?: (item: { id: number }) => void;
  isLoading: boolean;
  style?: CSSProperties;
  className?: string;
}> = (props) => (
  <TagsControl style={props.style} className={props.className}>
    <TagsControlContent>
      <TagsControlHeader gap={10}>
        <div>{props.header}</div>
        <DotsDivider />
        <div>{props.items.length}</div>
        {props.isLoading && <Loading />}
      </TagsControlHeader>
      <AllTags gap={5}>
        {props.items.map((t, i) => (
          <TagName
            actionable={!!props.onOpenClick}
            onClick={() => {
              if (props.onOpenClick) {
                props.onOpenClick(t);
              }
            }}
            key={i}
          >
            {t.name}
          </TagName>
        ))}
      </AllTags>
      <TagsActionsContainer>
        <Button onClick={props.onAddClick}>Добавить</Button>
      </TagsActionsContainer>
    </TagsControlContent>
  </TagsControl>
);

const Page = styled.div`
  height: 100vh;
`;
const TagsControlCard = styled(ControlCard)`
  background-color: ${color('favorite')};
  height: 160px;
  min-height: 160px;

  @media (max-width: 960px) {
    height: 180px;
  }
`;
const ProductsControlCard = styled(ControlCard)`
  background-color: ${color('accent-light')};
  height: 200px;

  @media (max-width: 960px) {
    height: 180px;
  }
`;

const ActionBarContainer = styled.div`
  padding: 40px;
`;

const Content = styled.div`
  position: relative;
`;

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

const TagsControl = styled.div`
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const TagsControlContent = styled(Container)`
  gap: 10px;
  flex-direction: column;
  height: 100%;
`;
const TagsControlHeader = styled(Container)`
  color: ${color('label')};
  align-items: center;
  font-size: 20px;
`;
const AllTags = styled(Container)`
  flex-wrap: wrap;
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    background-color: transparent;
  }
`;
const TagsActionsContainer = styled(Container)`
  justify-content: flex-end;
`;
const TagName = styled(Container)<{ actionable: boolean }>`
  height: 30px;
  align-items: center;
  border-radius: 20px;
  background-color: ${color('background')};
  color: ${color('accent')};
  padding: 0 12px;
  font-size: 17px;
  ${({ actionable }) => (actionable ? 'cursor: pointer' : '')};
`;

const DotsDivider = styled.div`
  width: 6px; 
  height: 6px;
  border-radius: 3px;
  background-color: ${color('label')};
  margin-top: 2px;
`;

const Favorite = styled(Container)`
  height: 100%;
  width: calc(70% - 20px);
  flex-shrink: 0;
  border-radius: 20px;
  background: ${color('background')};
  padding: 20px 20px 0 20px;
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);

  @media (max-width: 960px) {
    width: 100%;
  }
`;
const FavoriteRecipesCards = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 20px;
  width: 100%;
  max-width: 100%;
  padding-bottom: 20px;
`;

const Cards = styled.div`
  width: 100%;
  
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 20px;
  
  padding: 40px;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const ProgressLoading = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoRecipes = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 890px) {
    height: 600px;
  }
  @media (min-width: 890px) {
    height: 100%;
  }
`;

const FakeCard = styled.div`
  width: 260px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export { StartPage };
