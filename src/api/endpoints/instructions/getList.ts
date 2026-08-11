import { Instruction } from 'src/types/domain';
import { api } from 'src/api';

type GetInstructionsParams = {
  recipeId: number;
};

export const getList = ({ recipeId }: GetInstructionsParams) =>
  api
    .get<any, { data: Instruction[] }>(`/api/recipes/${recipeId}/instructions`)
    .then(({ data }) => data);
