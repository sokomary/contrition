import { api } from 'src/api';

type DisableContinuousSharingParams = {
  email: string;
  removeShared: boolean;
};

export const disableContinuousSharing = ({
  removeShared,
  email,
}: DisableContinuousSharingParams) =>
  api.delete('/api/recipes/share/continuous', {
    params: { email, removeShared },
  });
