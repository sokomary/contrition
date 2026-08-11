import { api } from 'src/api';

type shareRecipesCountinuouslyParams = {
  email: string;
};

export const shareCountinuously = ({
  email,
}: shareRecipesCountinuouslyParams) =>
  api.post(`/api/recipes/share/continuous`, null, {
    params: { email },
  });
