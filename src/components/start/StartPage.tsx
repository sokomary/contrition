import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { API } from '../../api';
import { AddRecipeDialog } from './AddRecipeDialog';
import { Recipe } from '../domain/Recipe';
import i18next from '../../i18next';

const StartPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [open, setOpen] = useState(false);

  const getRecipes = () => {
    API.getRecipes().then((res) => setRecipes(res));
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
      {recipes.map((r, i) => (
        <div key={i}>
          <div>{r.name}</div>
          <a href={r.link}>{r.link}</a>
          <div>{r.calories}</div>
          <div>{r.protein}</div>
          <div>{r.fats}</div>
          <div>{r.carbohydrates}</div>
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
