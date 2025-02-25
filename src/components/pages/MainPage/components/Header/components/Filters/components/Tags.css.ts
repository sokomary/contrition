import { style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  alignItems: 'center',
  fontSize: '18px',
  color: color('primary'),
  backgroundColor: color('background'),
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  padding: '3px 5px',
  borderRadius: '10px',

  '@media': {
    [MEDIA.ipadh]: {
      padding: '8px',
      borderRadius: '15px',
    },
  },
});

export const tag = recipe({
  base: {
    fontWeight: 'normal',
    borderRadius: '25px',
    alignSelf: 'center',
    fontSize: '18px',
    cursor: 'pointer',
    color: color('primary'),
    padding: '0 5px',

    '@media': {
      [MEDIA.ipadv]: {
        padding: '3px 10px',
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
