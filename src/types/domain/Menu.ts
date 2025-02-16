import { Meal } from './Meal';

export type Menu = {
  id: number;
  dateStart: string;
  dateEnd: string;
  meals?: Meal[];
};
