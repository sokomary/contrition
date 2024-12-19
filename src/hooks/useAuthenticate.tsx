import { useSuspenseQuery } from '@tanstack/react-query';
import { getUser } from 'src/api';
import { User } from 'src/domain';

export const useAuthenticate = () => {
  const { data: user } = useSuspenseQuery<User>(
    {
      queryKey: ['user'],
      queryFn: getUser,
    },
  );

  return user;
};
