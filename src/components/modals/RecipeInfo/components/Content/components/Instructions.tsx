import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Instruction } from 'src/types/domain';
import { CrossOutAble } from 'src/components/features';
import * as css from './Instructons.css';

type Props = {
  instructions: Instruction[];
};

export const Instructions = ({ instructions }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={css.container}>
      <div className={css.title}>
        {t('startpage.recipes.instructions.title')}
      </div>

      <div className={css.content}>
        {instructions.map((instruction) => (
          <Fragment key={instruction.id}>
            <div className={css.name}>{instruction.name}</div>

            <div className={css.steps}>
              {instruction.steps.map((step, index) => (
                <div className={css.step} key={step.id}>
                  <CrossOutAble content={`${index + 1}. ${step.description}`} />
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
