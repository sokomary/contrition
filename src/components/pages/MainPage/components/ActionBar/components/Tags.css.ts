import { style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '60%',
  alignItems: 'center',
  fontSize: '18px',
  color: color('primary'),

  '@media': {
    [MEDIA.iphone]: {
      width: '100%',
      padding: '0',
    },
  },
});

export const tag = recipe({
  base: {
    fontWeight: 'normal',
    borderRadius: '25px',
    padding: '3px 10px',
    alignSelf: 'center',
    fontSize: '18px',
    cursor: 'pointer',
    color: color('primary'),

    '@media': {
      [MEDIA.iphone]: {
        padding: '0 5px',
        height: '25px',
      },
    },
  },
  variants: {
    selected: {
      true: {
        fontWeight: 'bold',
      },
    },
  },
});
