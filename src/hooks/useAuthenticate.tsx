import { useQuery } from 'react-query';
import { getUser } from '../api/api';
import { User } from '../domain/User';

export const useAuthenticate = () => {
  const { data: user } = useQuery<User>(
    ['user'],
    () => getUser(),
    { keepPreviousData: true, suspense: true },
  );

  return user;
};
