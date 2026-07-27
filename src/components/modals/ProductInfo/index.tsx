import React from 'react';
import { Dialog } from 'src/components/features';
import { Value } from './components/Value';
import { useLogic } from './useLogic';
import * as css from './index.css';

export const ProductInfo = () => {
  const { isOpen, onClose, product } = useLogic();

  return (
    <Dialog
      header={product?.name}
      size='small'
      isActive={isOpen}
      onClose={onClose}
    >
      <div className={css.container}>
        <Value label='Калории:' content={product?.calories} />
        <Value label='Белки:' content={product?.protein} />
        <Value label='Жиры:' content={product?.fats} />
        <Value label='Углеводы:' content={product?.carbohydrates} />
      </div>
    </Dialog>
  );
};
