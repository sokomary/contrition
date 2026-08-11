import { useSuspenseQuery } from '@tanstack/react-query';
import { usersApi } from 'src/api';
import { User } from 'src/types/domain';

export const useAuthenticate = () => {
  const { data: user } = useSuspenseQuery<User>({
    queryKey: ['user'],
    queryFn: usersApi.getMe,
  });

  return user;
};
