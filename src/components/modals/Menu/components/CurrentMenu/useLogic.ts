import { Menu, Recipe } from 'src/types/domain';
import { useQuery } from '@tanstack/react-query';
import { getMenuProducts } from 'src/api';
import { useMemo } from 'react';
import { Temporal } from 'temporal-polyfill';
import { Period } from 'src/types';
import { generateDates } from 'src/components/features/DatesPicker/helpers';

export type Options = {
  menu?: Menu;
};

export const useLogic = ({ menu }: Options) => {
  const { data: products, isLoading } = useQuery({
    queryFn: () => getMenuProducts(menu?.id as number),
    queryKey: ['menu-products'],
    enabled: !!menu,
  });

  const period: Period = {
    start: menu ? Temporal.PlainDate.from(menu.dateStart) : undefined,
    end: menu ? Temporal.PlainDate.from(menu.dateEnd) : undefined,
  };

  const dates = generateDates(period);

  const tableData = useMemo(() => {
    const result: Record<string, Record<number, Recipe>> = {};
    menu?.meals?.forEach((meal) => {
      result[meal.date] = {
        ...result[meal.date],
        [meal.kind.id]: meal.recipe,
      };
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
