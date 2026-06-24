import { Role } from './Role';

export type User = {
  name: string;
  email: string;
  picture: string;
  roles: Role[];
};
