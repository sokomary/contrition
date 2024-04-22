import React from 'react';
import { Container, Dialog } from 'src/components/features';
import { Product } from 'src/domain';

type Props = {
  open: boolean;
  onClose: () => void;
  product: Product;
};

const ProductInfo = ({ open, onClose, product }: Props) => (
  <Dialog
    width={350}
    header={product.name}
    visible={open}
    onClose={onClose}
  >
    <Container vertical gap={10}>
      <Container gap={5}>
        <div>Калории: </div>
        <div>{product.calories}</div>
      </Container>
      <Container gap={5}>
        <div>Белки: </div>
        <div>{product.protein}</div>
      </Container>
      <Container gap={5}>
        <div>Жиры: </div>
        <div>{product.fats}</div>
      </Container>
      <Container gap={5}>
        <div>Углеводы: </div>
        <div>{product.carbohydrates}</div>
      </Container>
    </Container>
  </Dialog>
);

export { ProductInfo };
