import { Temporal } from 'temporal-polyfill';

export type Period<T = Temporal.PlainDate> = {
  start: T | null | undefined;
  end: T | null | undefined;
};
