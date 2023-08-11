import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API } from '../../api';
import { AddRecipeDialog } from './AddRecipeDialog';
import { Recipe } from '../../domain/Recipe';
import i18next from '../../i18next';
import { Button } from '../ui/Button';

const StartPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [open, setOpen] = useState(false);

  const getRecipes = () => {
    API.getRecipes().then((res) => setRecipes(res));
  };

  const deleteRecipe = (recipe: Recipe) => {
    API.deleteRecipe(recipe).then(getRecipes);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <Page>
      <AddRecipeDialog
        open={open}
        onClose={() => {
          setOpen(false);
          getRecipes();
        }}
      />
      <Button onClick={() => setOpen(true)}>{i18next.t('startpage:recipes.actions.add')}</Button>

      <Divider />
      {recipes.map((r, i) => (
        <div key={i}>
          <div>{r.name}</div>
          <a href={r.link}>{r.link}</a>
          <div>{r.calories}</div>
          <div>{r.protein}</div>
          <div>{r.fats}</div>
          <div>{r.carbohydrates}</div>
          {!!r.recipeProducts.length && <div>Продукты:</div>}
          {r.recipeProducts.map((p, index) => (
            <div style={{ padding: '0 20px' }} key={index}>
              {p.product.name}
              ,
              {' '}
              {p.quantity}
            </div>
          ))}
          {!!r.tags.length && <div>Теги:</div>}
          {r.tags.map((t) => <div key={t.id} style={{ padding: '0 20px' }}>{t.name}</div>)}
          <Button onClick={() => deleteRecipe(r)}>{i18next.t('startpage:recipes.actions.delete')}</Button>
          <Divider />
        </div>
      ))}
    </Page>
  );
};

const Page = styled.div`
  height: 100vh;
  padding: 30px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: grey;
  width: 100%;
  margin: 30px 0;
`;

export { StartPage };
