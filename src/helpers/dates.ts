import { Temporal } from 'temporal-polyfill';
import { Period } from '../types/Period';
import { Date } from '../types/Date';

export const periodToDates = ({
  start,
  end,
}: Period<Temporal.PlainDate | string>) => {
  if (!start || !end) {
    return null;
  }

  const dates: Temporal.PlainDate[] = [];
  let dateStartTmp = typeof start === 'string' ? fromString(start) : start;
  const dateEndTmp = typeof end === 'string' ? fromString(end) : end;
  while (Temporal.PlainDate.compare(dateStartTmp, dateEndTmp) === -1) {
    dates.push(dateStartTmp);
    dateStartTmp = dateStartTmp.add({ days: 1 });
  }
  dates.push(dateEndTmp);

  return dates;
};

export const now = () => Temporal.Now.plainDateTimeISO().toPlainDate();

export const compare = (
  a: Temporal.PlainDate | string,
  b: Temporal.PlainDate | string
) => Temporal.PlainDate.compare(a, b);

export const fromString = <T extends string | null | undefined>(
  date: T
): T extends string ? Temporal.PlainDate : T => {
  if (typeof date === 'string') {
    return Temporal.PlainDate.from(date) as any;
  }
  return date as any;
};
type FormatOptions = { year?: boolean };

export const format = (
  date?: Date | Period<Date>,
  options?: FormatOptions
): string | null | undefined => {
  if (!date) {
    return null;
  }

  if (typeof date === 'string') {
    const plainDate = fromString(date);
    return formatPlainDate(plainDate, options);
  }

  if (isDatePeriod(date)) {
    const start = format(date.start, options);
    const end = format(date.end, options);
    return `${start} - ${end}`;
  }

  return formatPlainDate(date as Temporal.PlainDate, options);
};

const isDatePeriod = (date: Date | Period<Date>): date is Period =>
  !!(date && typeof date === 'object' && ('start' in date || 'end' in date));

const formatPlainDate = (
  date?: Temporal.PlainDate,
  options?: FormatOptions
) => {
  if (!date) {
    return date;
  }

  let result = date.toLocaleString().replaceAll('/', '.');

  if (options?.year === false) {
    result = result.slice(0, 5);
  }

  return result;
};
