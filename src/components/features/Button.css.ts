import { recipe } from '@vanilla-extract/recipes';
import { color } from 'src/theme';

export const button = recipe({
  base: {
    border: 'none',
    outline: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '16px',
    width: 'fit-content',
    minWidth: 'fit-content',
    padding: '5px 15px',
  },
  variants: {
    size: {
      small: {
        height: '24px',
      },
      regular: {
        height: '32px',
      },
      large: {
        height: '45px',
        borderRadius: '10px',
      },
    },
    kind: {
      accent: {
        color: 'white',
        backgroundColor: color('accent'),

        selectors: {
          '&:active': {
            backgroundColor: color('accent-light'),
          },
        },
      },
      primary: {
        color: color('primary'),
        backgroundColor: color('secondary'),

        selectors: {
          '&:active': {
            backgroundColor: color('primary-disabled'),
          },
        },
      },
      ghost: {
        color: color('primary'),
        backgroundColor: 'transparent',
        padding: 0,

        selectors: {
          '&:active': {
            color: color('primary-disabled'),
          },
        },
      },
    },
  },
});
