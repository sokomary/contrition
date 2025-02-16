import React from 'react';
import { Modal } from 'src/components/features';
import { Product } from 'src/types/domain';
import { useDeviceScreen } from 'src/hooks';
import { Value } from './components/Value';
import * as css from './ProductInfo.css';

type Props = {
  open: boolean;
  onClose: () => void;
  product: Product;
};

export const ProductInfo = ({ open, onClose, product }: Props) => {
  const screen = useDeviceScreen();
  return (
    <Modal
      width={350}
      position={screen === 'iphone' ? 'bottom' : undefined}
      header={product.name}
      isActive={open}
      onClose={onClose}
    >
      <div className={css.container}>
        <Value label="Калории:" content={product.calories} />
        <Value label="Белки:" content={product.protein} />
        <Value label="Жиры:" content={product.fats} />
        <Value label="Углеводы:" content={product.carbohydrates} />
      </div>
    </Modal>
  );
};
