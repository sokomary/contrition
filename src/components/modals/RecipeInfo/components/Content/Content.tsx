import React, { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Recipe } from 'src/types/domain';
import { getInstructions } from 'src/api';
import { useDeviceScreen } from 'src/hooks';
import { Loading } from 'src/components/features';
import { Actions } from './components/Actions';
import * as css from './Content.css';

type Props = {
  recipe: Recipe;
};

export const Content = ({ recipe }: Props) => {
  const { data: instructions, isLoading } = useQuery({
    queryKey: [`instructions-${recipe.id}`],
    queryFn: () => getInstructions(recipe.id),
  });
  const screen = useDeviceScreen();

  return (
    <>
      {!isLoading && (
        <div className={css.dialogContentContainer}>
          <div className={css.mainContainer}>
            {recipe.comment && (
              <div className={css.comment}>{recipe.comment}</div>
            )}

            {recipe.portionSize && (
              <div>Размер порции: {recipe.portionSize}</div>
            )}

            <div className={css.productsContaines}>
              <div className={css.title}>Состав</div>
              <div className={css.card({ vertical: false })}>
                <div className={css.products}>
                  {recipe.recipeProducts.map((rp, index) => (
                    <div className={css.product} key={index}>
                      <span className={css.quantity}>{rp.quantity}</span>
                      <div className={css.divider}>|</div>
                      <div className={css.productName}>{rp.product.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!!instructions?.length && (
              <div className={css.instructions}>
                <div className={css.title}>Приготовление</div>
                <div className={css.card({ vertical: true })}>
                  {instructions.map((sp, index) => (
                    <Fragment key={index}>
                      <div className={css.instructionName}>{sp.name}</div>
                      <div className={css.instructionSteps}>
                        {sp.steps.map((s, sindex) => (
                          <div className={css.stepDescription} key={s.id}>
                            {`${sindex + 1}. ${s.description}`}
                          </div>
                        ))}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
          {screen !== 'mac' && <Actions recipe={recipe} />}
        </div>
      )}
      {isLoading && <Loading />}
    </>
  );
};
