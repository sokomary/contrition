import { useQuery } from 'react-query';
import { getUser } from 'src/api';
import { User } from 'src/domain';

export const useAuthenticate = () => {
  const { data: user } = useQuery<User>(
    ['user'],
    () => getUser(),
    { keepPreviousData: true, suspense: true },
  );

  return user;
};
