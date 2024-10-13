import { color } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

export const input = recipe({
  base: {
    outline: 'none',
    borderRadius: '7px',
    border: 'none',
    fontSize: '16px',
    backgroundColor: color('field'),

    padding: '5px 10px',

    selectors: {
      '&::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
      },
    },
  },

  variants: {
    size: {
      small: {
        height: '24px',
      },
      regular: {
        height: '34px',
      },
      large: {
        height: '42px',
      },
    },
  },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});
