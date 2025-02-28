import React from 'react';

type Props = {
  portionSize: number;
};

export const PortionSize = ({ portionSize }: Props) => (
  <div>Размер порции: {portionSize}</div>
);
