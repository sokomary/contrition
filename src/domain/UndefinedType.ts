import { failure, success, Type } from 'io-ts';

export const UndefinedType = new Type<undefined, null | undefined, unknown>(
  'undefinedType',
  (custom): custom is undefined => custom === undefined,
  (custom, context) => {
    if (custom === undefined || custom === null) {
      return success(undefined);
    }
    return failure(custom, context);
  },
  (typeA) => typeA,
);
