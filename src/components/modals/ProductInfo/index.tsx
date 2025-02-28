import React from 'react';
import { Modal } from 'src/components/features';
import { Value } from './components/Value';
import * as css from './index.css';
import { useLogic } from './useLogic';

export const ProductInfo = () => {
  const { isOpen, onClose, product, screen } = useLogic();

  return (
    <Modal
      width={350}
      position={screen === 'iphone' ? 'bottom' : undefined}
      header={product?.name}
      isActive={isOpen}
      onClose={onClose}
    >
      <div className={css.container}>
        <Value label="Калории:" content={product?.calories} />
        <Value label="Белки:" content={product?.protein} />
        <Value label="Жиры:" content={product?.fats} />
        <Value label="Углеводы:" content={product?.carbohydrates} />
      </div>
    </Modal>
  );
};
