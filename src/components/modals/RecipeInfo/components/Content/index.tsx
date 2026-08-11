import React from 'react';
import { useRecipeActions } from 'src/components/atoms/useRecipeActions';
import { ActionBar } from 'src/components/features';
import { Recipe } from 'src/types/domain';
import { useQuery } from '@tanstack/react-query';
import { getInstructions, useAuthenticate } from 'src/api';
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
  const user = useAuthenticate();

  const { data: instructions } = useQuery({
    queryKey: [`instructions-${recipe?.id}`],
    queryFn: () => getInstructions(recipe?.id as number),
    enabled: !!recipe,
  });

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.content}>
          {(['calories', 'protein', 'fats', 'carbohydrates'] as const).map(
            (field, index) => (
              <div key={index} className={css.element}>
                {recipe[field].toFixed(recipe[field] % 1 > 0 ? 0 : undefined)}
              </div>
            ),
          )}
        </div>

        {recipe.comment && <Comment comment={recipe.comment} />}
        {recipe.portionSize && <PortionSize portionSize={recipe.portionSize} />}
        <Products products={recipe.recipeProducts} />
        {!!instructions?.length && <Instructions instructions={instructions} />}
      </div>

      {screen === 'iphone' && user.id === recipe.ownerId && (
        <ActionBar className={css.actions} actions={actions} />
      )}
    </div>
  );
};
