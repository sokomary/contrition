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
      <h3 className={css.title} id={titleId}>
        {t('startpage.recipes.instructions.title')}
      </h3>

      <ul className={css.content}>
        {instructions.map((instruction) => (
          <li className={css.instruction} key={instruction.id}>
            <h4 className={css.name}>{instruction.name}</h4>

            <ol className={css.steps}>
              {instruction.steps.map((step, index) => (
                <li className={css.step} key={step.id}>
                  <CrossOutAble content={`${index + 1}. ${step.description}`} />
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </section>
  );
};
