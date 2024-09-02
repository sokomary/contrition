import React from 'react';
import { Container, Dialog } from 'src/components/features';
import { Product } from 'src/domain';
import { Value } from './components/Value';

type Props = {
  open: boolean;
  onClose: () => void;
  product: Product;
};

export const ProductInfo = ({ open, onClose, product }: Props) => (
  <Dialog
    width={350}
    header={product.name}
    visible={open}
    onClose={onClose}
  >
    <Container vertical gap={10}>
      <Value label="Калории:" content={product.calories} />
      <Value label="Белки:" content={product.protein} />
      <Value label="Жиры:" content={product.fats} />
      <Value label="Углеводы:" content={product.carbohydrates} />
    </Container>
  </Dialog>
);
