import React from 'react';
import { Modal } from 'src/components/features';
import { useDeviceScreen, useRoutModal } from 'src/hooks';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from 'src/api';
import { Value } from './components/Value';
import * as css from './ProductInfo.css';

export const ProductInfo = () => {
  const screen = useDeviceScreen();

  const { isOpen, value, onClose } = useRoutModal({
    key: 'product-info',
  });

  const id = parseInt(value, 10);

  const { data: product } = useQuery({
    queryKey: [`product-${id}`],
    queryFn: () => getProduct(id),
    enabled: !Number.isNaN(id),
  });

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
