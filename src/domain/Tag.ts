import {
  number, string, type, TypeOf,
} from 'io-ts';

const TagSchema = type({
  id: number,
  name: string,
}, 'TagSchema');
type Tag = TypeOf<typeof TagSchema>;

export type { Tag };
export { TagSchema };
