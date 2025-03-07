import { style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  alignItems: 'center',
});

export const content = style({
  display: 'flex',
  gap: '25px',
});

export const tag = recipe({
  base: {
    color: color('accent'),
    cursor: 'pointer',
  },
  variants: {
    selected: {
      true: {
        fontWeight: 'bold',
      },
    },
  },
});

export const name = style({
  height: '30px',
});

export const actions = style({
  marginBottom: '15px',
  justifyContent: 'flex-end',

  '@media': {
    [MEDIA.ipadh]: {
      marginBottom: 0,
    },
  },
});
