import {
  string, type, TypeOf,
} from 'io-ts';

export const RoleSchema = type({
  name: string,
}, 'RoleSchema');
export type Role = TypeOf<typeof RoleSchema>;
