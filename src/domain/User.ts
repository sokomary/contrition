import {
  array,
  string, type, TypeOf,
} from 'io-ts';
import { RoleSchema } from './Role';

const UserSchema = type({
  name: string,
  email: string,
  picture: string,
  roles: array(RoleSchema),
}, 'UserSchema');
type User = TypeOf<typeof UserSchema>;

const isAdmin = (user?: User) => !!user?.roles?.find((r) => r.name === 'admin');

export type { User };
export { UserSchema, isAdmin };
