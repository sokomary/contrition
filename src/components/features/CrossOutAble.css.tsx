import { recipe } from '@vanilla-extract/recipes';
import { color } from 'src/theme';

export const content = recipe({
  variants: {
    crossedOut: {
      true: {
        textDecoration: 'line-through',
        color: color('label'),
      },
    },
  },
});
