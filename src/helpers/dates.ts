import { Temporal } from 'temporal-polyfill';
import { Period } from '../types/Period';

export const periodToDates = ({ start, end }: Period) => {
  if (!start || !end) {
    return null;
  }

  const dates: Temporal.PlainDate[] = [];
  let dateStartTmp = start;
  const dateEndTmp = end;
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
