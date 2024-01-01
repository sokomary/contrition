import {
  string, type, TypeOf,
} from 'io-ts';

const RoleSchema = type({
  name: string,
}, 'RoleSchema');
type Role = TypeOf<typeof RoleSchema>;

export type { Role };
export { RoleSchema };
