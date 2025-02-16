import { Role } from './Role';

export type User = {
  name: string;
  email: string;
  picture: string;
  roles: Role[];
};

export const isAdmin = (user?: User) => !!user?.roles?.find((r) => r.name === 'admin');
