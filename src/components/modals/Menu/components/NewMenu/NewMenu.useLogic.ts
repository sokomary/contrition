import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addMenu, getRecipes } from 'src/api';
import { Meal, Recipe, Kind } from 'src/types/domain';
import { isEqual, omit, parseInt } from 'lodash';
import { Action } from 'src/components/features';
import { periodToDates } from 'src/helpers/dates';
import { Period } from 'src/types/Period';
import { useLocation, useNavigate } from 'src/router';

export type Options = {
  kinds: Kind[];
  onSave: () => void;
  onCancel: () => void;
};

export const useLogic = (props: Options) => {
  const { search } = useLocation();
  const { navigate } = useNavigate();

  const { data: recipes } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(),
  });

  const [period, setPeriod] = useState<Period>({ start: null, end: null });
  const [meals, setMeals] = useState<Omit<Meal, 'id'>[]>([]);
  const [selecting, setSelecting] = useState<{
    date: string;
    kindId: number;
  } | null>(null);

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      props.onSave();
    },
  });

  const findMeal = useCallback(
    (date: string, kindId: number) =>
      meals.filter((m) => m.date === date).find((m) => m.kind.id === kindId),
    [meals]
  );

  useEffect(() => {
    const date = search.select?.[0];
    const kindId = search.select?.[1]
      ? parseInt(search.select[1], 10)
      : undefined;
    const recipeId = search.select?.[2]
      ? parseInt(search.select[2], 10)
      : undefined;
    const recipe = recipes?.find((r) => r.id === recipeId);

    if (recipeId && kindId) {
      const meal = findMeal(date, kindId);
      const mealRecipe = meal?.recipe;

      if (meal && recipe && (!mealRecipe || mealRecipe.id !== recipeId)) {
        setMeals((prev) => [
          ...prev.filter((m) => !isEqual(m, meal)),
          { ...meal, recipe },
        ]);
        setSelecting(null);
        navigate({ search: { ...omit(search, 'select') } });
      }
    }
  }, [findMeal, props.kinds, navigate, recipes, search]);

  const actions: Action[] = [
    {
      kind: 'primary',
      label: 'Отмена',
      onClick: props.onCancel,
    },
    {
      display:
        !!period.start && !!period.end && !meals.find((meal) => !meal.recipe),
      kind: 'primary',
      label: 'Сохранить',
      onClick: () => {
        if (period.start && period.end) {
          addMutation.mutate({
            dateStart: period.start.toString(),
            dateEnd: period.end.toString(),
            meals,
          });
        }
      },

      isLoading: addMutation.isPending,
    },
  ];

  const onPeriodUpdate = (newPeriod: Period) => {
    setPeriod(newPeriod);
    const dates = periodToDates(newPeriod);
    if (dates && props.kinds) {
      const newMeals = props.kinds
        .map((kind) =>
          dates.map((date) => ({
            date: date.toString(),
            kind,
            recipe: null as unknown as Recipe,
          }))
        )
        .flat(1);

      setMeals(newMeals);
    }
  };

  return {
    dates: Array.from(new Set(meals.map((meal) => meal.date))).sort(),
    findMeal,
    kinds: props.kinds,
    period,
    setPeriod: onPeriodUpdate,
    isSelected: (date: string, kind: Kind) =>
      selecting?.date === date.toString() && selecting?.kindId === kind.id,
    actions,
    selecting,
    onSelect: (date: string, kindId: number) => {
      navigate({
        search: { select: [date, kindId] },
        keepPreviousSearch: true,
      });
      setSelecting({ date, kindId });
    },
    onCancel: () => {
      navigate({ search: omit(search, 'select') });
      setSelecting(null);
    },
    onRemove: (date: string, kindId: number) => {
      const meal = findMeal(date, kindId);

      if (meal?.recipe) {
        setMeals((prev) => [
          ...prev.filter((m) => !isEqual(m, meal)),
          { ...meal, recipe: null as unknown as Recipe },
        ]);
      }
    },
  };
};
