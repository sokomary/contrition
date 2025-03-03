import React, { useState } from 'react';
import { Button } from './Button';
import * as css from './CrossOutAble.css';

type Props = {
  content: string;
};
export const CrossOutAble = ({ content }: Props) => {
  const [crossedOut, setCrossedOut] = useState(false);

  return (
    <Button
      kind="ghost"
      className={css.content({ crossedOut })}
      onClick={() => setCrossedOut((prev) => !prev)}
    >
      {content}
    </Button>
  );
};
