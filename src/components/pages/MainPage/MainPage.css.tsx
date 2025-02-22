import { recipe } from '@vanilla-extract/recipes';

export const container = recipe({
  base: {
    height: '100vh',
    width: '100%',
  },
  variants: {
    withSide: {
      false: {},
      true: { width: 'calc(100% - 577px)' },
    },
  },
});
