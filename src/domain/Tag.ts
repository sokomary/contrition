import {
  number, string, type, TypeOf,
} from 'io-ts';

export const TagSchema = type({
  id: number,
  name: string,
}, 'TagSchema');

export type Tag = TypeOf<typeof TagSchema>;
