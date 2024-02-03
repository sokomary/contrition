import {
  array, number,
  string, type, TypeOf,
} from 'io-ts';
import { StepSchema } from './Step';

export const InstructionSchema = type({
  id: number,
  name: string,
  steps: array(StepSchema),
}, 'InstructionSchema');
export type Instruction = TypeOf<typeof InstructionSchema>;
