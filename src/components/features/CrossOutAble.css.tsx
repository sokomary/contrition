import { recipe } from '@vanilla-extract/recipes';
import { color } from 'src/theme';

export const content = recipe({
  base: { color: color('font'), textDecoration: 'none', textAlign: 'left' },

  variants: {
    crossedOut: {
      true: {
        textDecoration: 'line-through',
        color: color('label'),
      },
    },
  },
});
