import React, { useState } from 'react';
import { ActionBase } from './ActionBase';
import * as css from './CrossOutAble.css';

type Props = {
  content: string;
};
export const CrossOutAble = ({ content }: Props) => {
  const [crossedOut, setCrossedOut] = useState(false);

  return (
    <ActionBase
      className={css.content({ crossedOut })}
      onClick={() => setCrossedOut((prev) => !prev)}
    >
      {content}
    </ActionBase>
  );
};
