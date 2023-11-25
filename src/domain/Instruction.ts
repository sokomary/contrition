import {
  array, number,
  string, type, TypeOf,
} from 'io-ts';
import { StepSchema } from './Step';

const InstructionSchema = type({
  id: number,
  name: string,
  steps: array(StepSchema),
}, 'InstructionSchema');
type Instruction = TypeOf<typeof InstructionSchema>;

export type { Instruction };
export { InstructionSchema };
