import React from 'react';
import * as css from './Comment.css';

type Props = {
  comment: string;
};

export const Comment = ({ comment }: Props) => (
  <div className={css.container}>{comment}</div>
);
