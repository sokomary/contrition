import {
  array,
  string, type, TypeOf,
} from 'io-ts';
import { RoleSchema } from './Role';

export const UserSchema = type({
  name: string,
  email: string,
  picture: string,
  roles: array(RoleSchema),
}, 'UserSchema');

export type User = TypeOf<typeof UserSchema>;

export const isAdmin = (user?: User) => !!user?.roles?.find((r) => r.name === 'admin');
