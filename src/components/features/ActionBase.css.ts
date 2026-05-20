import { recipe } from '@vanilla-extract/recipes';
import { color, px } from 'src/theme';

export const button = recipe({
  base: {
    outline: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: px(7),
    boxSizing: 'border-box',
  },

  variants: {
    disabled: {
      true: {
        color: color('label'),
        pointerEvents: 'none',
      },
    },
  },
});
