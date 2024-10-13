import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';
import { MEDIA } from 'src/hooks';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '70%',
  alignItems: 'center',
  fontSize: '18px',
  padding: '0 30px 0 20px',
  color: color('primary'),

  '@media': {
    [MEDIA.iphone]: {
      width: '100%', padding: '0',
    },
  },
});

export const name = recipe({
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
