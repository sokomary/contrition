import { Menu, Recipe } from 'src/types/domain';
import { useQuery } from '@tanstack/react-query';
import { recipeProductsApi } from 'src/api';
import { useMemo, useState } from 'react';
import { Temporal } from 'temporal-polyfill';
import { Period } from 'src/types';
import { generateDates } from 'src/components/features/DatesPicker/helpers';

export type Options = {
  menu?: Menu;
};

export const useLogic = ({ menu }: Options) => {
  const [excludeRecipes, setExcludeRecipes] = useState<Recipe[]>([]);
  const excludeRecipeIds = excludeRecipes.map(({ id }) => id);

  const { data: products, isLoading } = useQuery({
    queryFn: () =>
      recipeProductsApi.getList({
        menuId: menu?.id as number,
        excludeRecipeIds: excludeRecipeIds,
      }),
    queryKey: ['menu-products', excludeRecipeIds],
    enabled: !!menu,
  });

  const period: Period = {
    start: menu ? Temporal.PlainDate.from(menu.dateStart) : undefined,
    end: menu ? Temporal.PlainDate.from(menu.dateEnd) : undefined,
  };

  const dates = generateDates(period);

  const tableData = useMemo(() => {
    const result: Record<string, Record<number, Recipe>> = {};
    const map = new Map<number, Recipe>();

    menu?.meals?.forEach((meal) => {
      result[meal.date] = {
        ...result[meal.date],
        [meal.kind?.id]: meal.recipe,
      };

      if (!map.has(meal.recipe.id)) {
        map.set(meal.recipe.id, meal.recipe);
      }
    });

    return { table: result, recipes: Array.from(map.values()) };
  }, [menu?.meals]);

  return {
    tableData,
    period,
    dates,
    products,
    isLoading,
    excludeRecipes,
    setExcludeRecipes,
  };
};
