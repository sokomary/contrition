import React from 'react';
import { useRecipeActions } from 'src/components/atoms/useRecipeActions';
import { ActionBar } from 'src/components/features';
import { Recipe } from 'src/types/domain';
import { useQuery } from '@tanstack/react-query';
import { getInstructions } from 'src/api';
import { useDeviceScreen } from 'src/theme';
import { Comment } from './components/Comment';
import { PortionSize } from './components/PortionSize';
import { Products } from './components/Products';
import { Instructions } from './components/Instructions';
import * as css from './index.css';

type Props = {
  recipe: Recipe;
};
export const Content = ({ recipe }: Props) => {
  const actions = useRecipeActions({ recipe });
  const screen = useDeviceScreen();

  const { data: instructions } = useQuery({
    queryKey: [`instructions-${recipe?.id}`],
    queryFn: () => getInstructions(recipe?.id as number),
    enabled: !!recipe,
  });

  return (
    <>
      <div className={css.container}>
        {recipe.comment && <Comment comment={recipe.comment} />}
        {recipe.portionSize && <PortionSize portionSize={recipe.portionSize} />}
        <Products products={recipe.recipeProducts} />
        {!!instructions?.length && <Instructions instructions={instructions} />}
      </div>

      {screen !== 'mac' && (
        <ActionBar className={css.actions} actions={actions} />
      )}
    </>
  );
};
