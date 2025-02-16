import { Temporal } from 'temporal-polyfill';
import { useEffect, useMemo, useRef, useState } from 'react';
import { compare } from '../../helpers/dates';
import { Period } from '../../types/Period';

export type Options = {
  value: Period;
  onChange: (newPeriod: Period) => void;
};

export const useLogic = (props: Options) => {
  const [open, setOpen] = useState<boolean>(false);
  const [now, setNow] = useState(Temporal.Now.plainDateTimeISO().toPlainDate());
  const { value, onChange } = props;

  const datePickerRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const monthName = now.toLocaleString('ru-RU', { month: 'long' });
  const month = now.toLocaleString('ru-RU', { month: 'numeric' });
  const year = now.toLocaleString('en-US', { year: 'numeric' });

  const calendar = useMemo(
    () => getDaysWithWeekdays(parseInt(year, 10), parseInt(month, 10)),
    [month, year]
  );

  return {
    datePickerRef,
    value,
    plusYear: () => {
      setNow((prev) => prev.add({ years: 1 }));
    },
    minusYear: () => {
      setNow((prev) => prev.add({ years: -1 }));
    },
    plusMonth: () => {
      setNow((prev) => prev.add({ months: 1 }));
    },
    minusMonth: () => {
      setNow((prev) => prev.add({ months: -1 }));
    },
    month: monthName,
    year,
    open,
    setOpen,
    now,
    calendar,
    onDayClick: (d: number) => {
      const date = Temporal.PlainDate.from({
        year: parseInt(year, 10),
        month: parseInt(month, 10),
        day: d,
      });

      let result;
      if (!value.start && !value.end) {
        result = { ...value, start: date };
      }
      if (value.start && !value.end) {
        if (compare(value.start, date) === -1) {
          result = { ...value, end: date };
        } else {
          result = { start: date, end: value.start };
        }
      }
      if (!value.start && value.end) {
        if (Temporal.PlainDate.compare(date, value.end) === -1) {
          result = { ...value, start: date };
        } else {
          result = { start: value.end, end: date };
        }
      }
      if (value.start && value.end) {
        result = { start: date, end: null };
      }

      onChange(result || value);
    },
    selected: (date: Temporal.PlainDate | null) => {
      if (!date) {
        return false;
      }
      if (value.end || value.start) {
        if (value.end && !value.start) {
          return compare(value.end, date) === 0 ? 'corner-right' : false;
        }
        if (value.start && !value.end) {
          return compare(value.start, date) === 0 ? 'corner-left' : false;
        }
        if (value.start && value.end) {
          if (compare(value.start, date) === 0) {
            return 'corner-left';
          }
          if (compare(value.end, date) === 0) {
            return 'corner-right';
          }
          if (
            compare(value.start, date) === -1 &&
            compare(date, value.end) === -1
          ) {
            return 'inside';
          }
          return false;
        }
      }
      return false;
    },
  };
};

function getDaysWithWeekdays(year: number, month: number) {
  const calendarMonth: {
    [key: string]: { day: number; date: Temporal.PlainDate | null }[];
  } = {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  };
  const { daysInMonth } = Temporal.PlainDate.from({ year, month, day: 1 });

  let firstWeekday = null;

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = Temporal.PlainDate.from({ year, month, day });

    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    if (day === 1) {
      firstWeekday = weekday;
    }

    const firstWeekDayIndex = firstWeekday
      ? Object.keys(calendarMonth).indexOf(firstWeekday)
      : -1;
    const weekDayIndex = Object.keys(calendarMonth).indexOf(weekday);

    calendarMonth[weekday] = [
      ...calendarMonth[weekday],
      ...(day <= 7 && weekDayIndex < firstWeekDayIndex
        ? [
            { day: -1, date: null },
            { day, date },
          ]
        : [{ day, date }]),
    ];
  }

  return calendarMonth;
}
