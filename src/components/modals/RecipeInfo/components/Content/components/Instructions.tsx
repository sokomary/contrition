import React, { Fragment } from 'react';
import { Instruction } from 'src/types/domain';
import { CrossOutAble } from 'src/components/features';
import * as css from './Instructons.css';

type Props = {
  instructions: Instruction[];
};

export const Instructions = ({ instructions }: Props) => (
  <div className={css.container}>
    <div className={css.title}>Приготовление</div>

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
