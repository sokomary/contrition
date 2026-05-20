import { Period } from 'src/types';

export type PeriodPickerOptions = {
  value?: Period;
  onChange: (newPeriod: Period) => void;
};
