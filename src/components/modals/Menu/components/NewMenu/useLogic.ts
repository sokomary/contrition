import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Temporal } from 'temporal-polyfill';
import { menuApi } from 'src/api';
import { Kind, Menu } from 'src/types/domain';
import { Action } from 'src/components/features';
import { Period } from 'src/types/Period';
import { toast } from 'react-toastify';
import { generateDates } from 'src/components/features/DatesPicker/helpers';

export type Options = {
  kinds: Kind[];
  menu?: Menu;
  onSave: () => void;
  onCancel: () => void;
};

type MealDraft = {
  id?: number;
  date: string;
  kind: Kind;
  recipeId: number | null;
  recipeName: string;
};

const isSlot = (meal: MealDraft, date: string, kindId: number) =>
  meal.date === date && meal.kind.id === kindId;

const buildMeals = (period: Period, kinds: Kind[], existing: MealDraft[]) => {
  const dates = generateDates(period);
  if (!dates) {
    return [];
  }

  return kinds.flatMap((kind) =>
    dates.map((plainDate) => {
      const date = plainDate.toString();
      return (
        existing.find((meal) => isSlot(meal, date, kind.id)) ?? {
          date,
          kind,
          recipeId: null,
          recipeName: '',
        }
      );
    }),
  );
};

const toPeriod = (menu?: Menu): Period =>
  menu
    ? {
        start: Temporal.PlainDate.from(menu.dateStart),
        end: Temporal.PlainDate.from(menu.dateEnd),
      }
    : { start: null, end: null };

const toDrafts = (menu?: Menu): MealDraft[] =>
  menu?.meals?.flatMap((meal) =>
    meal.kind
      ? [
          {
            id: meal.id,
            date: meal.date,
            kind: meal.kind,
            recipeId: meal.recipe?.id ?? null,
            recipeName: meal.recipe?.name ?? '',
          },
        ]
      : [],
  ) ?? [];

export const useLogic = (props: Options) => {
  const { t } = useTranslation();

  const [period, setPeriod] = useState<Period>(() => toPeriod(props.menu));
  const [meals, setMeals] = useState<MealDraft[]>(() =>
    buildMeals(toPeriod(props.menu), props.kinds, toDrafts(props.menu)),
  );
  const [modalData, setModalData] = useState<{
    date: string;
    kindId: number;
  } | null>(null);

  const queryClient = useQueryClient();
  const saveMutation = useMutation({
    mutationFn: menuApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      queryClient.invalidateQueries({ queryKey: ['menu-products'] });
      toast(
        t(props.menu ? 'startpage.menu.updated' : 'startpage.menu.created'),
      );
      props.onSave();
    },
    onError: () => toast(t('errors.somethingWentWrong')),
  });

  const findMeal = useCallback(
    (date: string, kindId: number) =>
      meals.find((meal) => isSlot(meal, date, kindId)),
    [meals],
  );

  const updateMeal = (
    date: string,
    kindId: number,
    recipeId: number | null,
    recipeName: string,
  ) =>
    setMeals((prev) =>
      prev.map((meal) =>
        isSlot(meal, date, kindId) ? { ...meal, recipeId, recipeName } : meal,
      ),
    );

  const actions: Action[] = [
    {
      kind: 'primary',
      label: t('modals.confirmation.actions.cancel.label'),
      onClick: props.onCancel,
    },
    {
      display: !!period.start && !!period.end,
      kind: 'primary',
      label: t('startpage.recipes.actions.save'),
      onClick: () => {
        if (period.start && period.end) {
          saveMutation.mutate({
            id: props.menu?.id,
            dateStart: period.start.toString(),
            dateEnd: period.end.toString(),
            meals: meals.map((meal) => ({
              id: meal.id,
              date: meal.date,
              recipeId: meal.recipeId,
              kindId: meal.kind.id,
            })),
          });
        }
      },

      isLoading: saveMutation.isPending,
    },
  ];

  const onPeriodUpdate = (newPeriod: Period) => {
    setPeriod(newPeriod);
    setMeals((prev) => buildMeals(newPeriod, props.kinds, prev));
  };

  return {
    dates: Array.from(new Set(meals.map((meal) => meal.date))).sort(),
    findMeal,
    kinds: props.kinds,
    period,
    setPeriod: onPeriodUpdate,
    actions,
    selectRecipe: (
      date: string,
      recipeId: number,
      kindId: number,
      recipeName: string,
    ) => updateMeal(date, kindId, recipeId, recipeName),
    modalData,
    setModalData,
    onRemove: (date: string, kindId: number) =>
      updateMeal(date, kindId, null, ''),
  };
};
