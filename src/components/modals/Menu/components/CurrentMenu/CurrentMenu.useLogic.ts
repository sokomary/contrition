import { Menu, Recipe } from 'src/types/domain';
import { useQuery } from '@tanstack/react-query';
import { getMenuProducts } from 'src/api';
import { periodToDates } from 'src/helpers/dates';
import { useMemo } from 'react';

export type Options = {
  menu?: Menu;
};

export const useLogic = ({ menu }: Options) => {
  const { data: products, isLoading } = useQuery({
    queryFn: () => getMenuProducts(menu?.id as number),
    queryKey: ['menu-products'],
    enabled: !!menu,
  });

  const period = { start: menu?.dateStart, end: menu?.dateEnd };

  const dates = periodToDates(period);

  const tableData = useMemo(() => {
    const result: Record<string, Record<number, Recipe>> = {};
    menu?.meals?.forEach((meal) => {
      result[meal.date] = { ...result[meal.date], [meal.kind.id]: meal.recipe };
    });
    return result;
  }, [menu?.meals]);

  return {
    tableData,
    period,
    dates,
    products,
    isLoading,
  };
};
