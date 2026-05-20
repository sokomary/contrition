import { Temporal } from 'temporal-polyfill';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { times } from 'lodash';

export const useCalendar = () => {
  const { i18n } = useTranslation();

  const [monthStart, setMonthStart] = useState(
    Temporal.Now.plainDateISO().with({ day: 1 }),
  );

  const monthName = monthStart.toLocaleString(i18n.language, { month: 'long' });
  const month = monthStart.toLocaleString(i18n.language, { month: 'numeric' });
  const year = monthStart.toLocaleString(i18n.language, { year: 'numeric' });

  const days = useMemo(
    () =>
      times(monthStart.daysInMonth + monthStart.dayOfWeek - 1).map((i) => {
        const shift = i - monthStart.dayOfWeek + 1;
        return shift >= 0 ? monthStart.add({ days: shift }) : undefined;
      }),
    [monthStart],
  );

  return {
    today: Temporal.Now.plainDateISO(),
    monthName,
    month,
    year,
    days,
    plusYear: () => setMonthStart((prev) => prev.add({ years: 1 })),
    minusYear: () => setMonthStart((prev) => prev.add({ years: -1 })),
    plusMonth: () => setMonthStart((prev) => prev.add({ months: 1 })),
    minusMonth: () => setMonthStart((prev) => prev.add({ months: -1 })),
  };
};
