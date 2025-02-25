import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useToggleModal } from 'src/components/modals';
import { getProducts } from 'src/api';
import { Product } from 'src/types/domain';
import { Button } from 'src/components/features';
import { Card } from './Card';
import * as css from './Products.css';

export const Products = () => {
  const { open: openAddProduct } = useToggleModal(`product-new`, 'true');
  const { data: products } = useSuspenseQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  });

  return (
    <Card
      title="Продукты"
      items={(products || []).map((product) => (
        <Item key={product.id} item={product} />
      ))}
      className={css.container}
      actions={[
        {
          label: 'Добавить продукт',
          onClick: openAddProduct,
          kind: 'ghost',
        },
      ]}
    />
  );
};

const Item = ({ item }: { item: Product }) => {
  const { open } = useToggleModal('product-info', item.id.toString());
  return (
    <Button className={css.item} onClick={open}>
      {item.name}
    </Button>
  );
};
