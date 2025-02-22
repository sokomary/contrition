import React from 'react';
import { ActionBar } from 'src/components/features';
import { useRecipeActions } from 'src/components/atoms/useRecipeActions';
import { Recipe } from 'src/types/domain';
import * as css from './Actions.css';

type Props = {
  recipe: Recipe;
};
export const Actions = ({ recipe }: Props) => {
  const actions = useRecipeActions({ recipe });

  return <ActionBar className={css.container} actions={actions} />;
};
