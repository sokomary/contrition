import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMenu } from 'src/api';
import { Kind, Meal } from 'src/types/domain';
import { isEqual } from 'lodash';
import { Action } from 'src/components/features';
import { Period } from 'src/types/Period';
import { toast } from 'react-toastify';
import { generateDates } from 'src/components/features/DatesPicker/helpers';

export type Options = {
  kinds: Kind[];
  onSave: () => void;
  onCancel: () => void;
};

export const useLogic = (props: Options) => {
  const { t } = useTranslation();

  const [period, setPeriod] = useState<Period>({ start: null, end: null });
  const [meals, setMeals] = useState<
    (Omit<Meal, 'id' | 'recipe'> & { recipeId: number; recipeName: string })[]
  >([]);
  const [modalData, setModalData] = useState<{
    date: string;
    kindId: number;
  } | null>(null);

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      toast(t('startpage.menu.created'));
      props.onSave();
    },
    onError: () => toast(t('errors.somethingWentWrong')),
  });

  const findMeal = useCallback(
    (date: string, kindId: number) =>
      meals.filter((m) => m.date === date).find((m) => m.kind.id === kindId),
    [meals],
  );

  const selectRecipe = (
    date: string,
    recipeId: number,
    kindId: number,
    recipeName: string,
  ) => {
    const meal = findMeal(date, kindId);
    const mealRecipeId = meal?.recipeId;

    if (meal && mealRecipeId !== recipeId) {
      setMeals((prev) => [
        ...prev.filter((m) => !isEqual(m, meal)),
        { ...meal, recipeId, recipeName },
      ]);
    }
  };

  const actions: Action[] = [
    {
      kind: 'primary',
      label: t('modals.confirmation.actions.cancel.label'),
      onClick: props.onCancel,
    },
    {
      display:
        !!period.start && !!period.end && !meals.find((meal) => !meal.recipeId),
      kind: 'primary',
      label: t('startpage.recipes.actions.save'),
      onClick: () => {
        if (period.start && period.end) {
          addMutation.mutate({
            dateStart: period.start.toString(),
            dateEnd: period.end.toString(),
            meals: meals.map((meal) => ({
              ...meal,
              kindId: meal.kind.id,
            })),
          });
        }
      },

      isLoading: addMutation.isPending,
    },
  ];

  const onPeriodUpdate = (newPeriod: Period) => {
    setPeriod(newPeriod);
    const dates = generateDates(newPeriod);
    if (dates && props.kinds) {
      const newMeals = props.kinds
        .map((kind) =>
          dates.map((date) => ({
            date: date.toString(),
            kind,
            recipeId: null as unknown as number,
            recipeName: '',
          })),
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
    actions,
    selectRecipe,
    modalData,
    setModalData,
    onRemove: (date: string, kindId: number) => {
      const meal = findMeal(date, kindId);

      if (meal?.recipeId) {
        setMeals((prev) => [
          ...prev.filter((m) => !isEqual(m, meal)),
          { ...meal, recipeId: null as unknown as number, recipeName: '' },
        ]);
      }
    },
  };
};
