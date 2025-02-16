import { Temporal } from 'temporal-polyfill';

export type Period = {
  start: Temporal.PlainDate | null;
  end: Temporal.PlainDate | null;
};
