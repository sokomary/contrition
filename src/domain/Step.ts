import {
  number,
  string, type, TypeOf,
} from 'io-ts';

const StepSchema = type({
  id: number,
  description: string,
}, 'StepSchema');
type Step = TypeOf<typeof StepSchema>;

export type { Step };
export { StepSchema };
