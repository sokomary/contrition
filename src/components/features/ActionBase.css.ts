import { recipe } from '@vanilla-extract/recipes';
import { color, px, text } from 'src/theme';

export const button = recipe({
  base: {
    outline: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: px(7),
    boxSizing: 'border-box',
    background: 'none',
    border: 'none',
    ...text.text3,
    padding: 0,
    color: color('font'),
    textDecoration: 'none',
    textAlign: 'left',
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
