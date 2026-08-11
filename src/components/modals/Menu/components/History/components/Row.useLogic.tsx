import { Menu } from 'src/types/domain';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { recipeProductsApi } from 'src/api';

export type Options = { menu: Menu };

export const useLogic = ({ menu }: Options) => {
  const { t } = useTranslation();
  const dates = Array.from(
    new Set(menu.meals?.map((meal) => meal.date)),
  ).sort();

  const [open, setOpen] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryFn: () => recipeProductsApi.getList({ menuId: menu.id }),
    queryKey: ['menu-products', menu.id],
    enabled: open,
  });

  const actions = [
    {
      label: t('startpage.products.title'),
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
