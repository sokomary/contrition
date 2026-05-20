import { Menu } from 'src/types/domain';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMenuProducts } from 'src/api';

export type Options = { menu: Menu };

export const useLogic = ({ menu }: Options) => {
  const dates = Array.from(
    new Set(menu.meals?.map((meal) => meal.date)),
  ).sort();

  const [open, setOpen] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryFn: () => getMenuProducts(menu.id),
    queryKey: ['menu-products', menu.id],
    enabled: open,
  });

  const actions = [
    {
      label: 'Продукты',
      onClick: () => setOpen(!open),
      kind: 'ghost' as const,
      isLoading,
    },
  ];

  return {
    dates,
    actions,
    products,
    open,
  };
};
