import { Step } from './Step';

export type Instruction = {
  id: number;
  name: string;
  steps: Step[];
};
