import { Temporal } from 'temporal-polyfill';
import { Period } from 'src/types';

export const compare = (a: Temporal.PlainDate, b: Temporal.PlainDate) =>
  Temporal.PlainDate.compare(a, b);

export const generateDates = ({ start, end }: Period) => {
  if (!start || !end) {
    return null;
  }
  const dates: Temporal.PlainDate[] = [];
  let cursor = start;
  while (Temporal.PlainDate.compare(cursor, end) === -1) {
    dates.push(cursor);
    cursor = cursor.add({ days: 1 });
  }
  dates.push(end);

  return dates;
};
