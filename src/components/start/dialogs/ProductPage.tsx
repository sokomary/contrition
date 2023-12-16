import React, {
  FC,
} from 'react';
import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';
import { Container } from '../../ui/Container';
import { Product } from '../../../domain/Product';

const ProductPage: FC<{ open: boolean; onClose: () => void; product: Product }> = ({ open, onClose, product }) => (
  <WideDialog header={product.name} visible={open} onHide={onClose}>
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
  </WideDialog>
);

const WideDialog = styled(Dialog)`
  width: 45%;

  @media (max-width: 890px) {
    width: 80%;
  }
`;

export { ProductPage };
