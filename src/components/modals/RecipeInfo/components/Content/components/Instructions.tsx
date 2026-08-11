import React, { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Instruction } from 'src/types/domain';
import { CrossOutAble } from 'src/components/features';
import * as css from './Instructons.css';

type Props = {
  instructions: Instruction[];
};

export const Instructions = ({ instructions }: Props) => {
  const { t } = useTranslation();
  const titleId = useId();

  return (
    <section className={css.container} aria-labelledby={titleId}>
      <h5 className={css.title} id={titleId}>
        {t('startpage.recipes.instructions.title')}
      </h5>

      <div className={css.content}>
        {instructions.map((instruction) => (
          <div className={css.instruction} key={instruction.id}>
            <h6 className={css.name}>{instruction.name}</h6>

            <div className={css.steps}>
              {instruction.steps.map((step, index) => (
                <CrossOutAble
                  key={step.id}
                  content={`${index + 1}. ${step.description}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
