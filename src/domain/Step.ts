import {
  number,
  string, type, TypeOf,
} from 'io-ts';

export const StepSchema = type({
  id: number,
  description: string,
}, 'StepSchema');
export type Step = TypeOf<typeof StepSchema>;
