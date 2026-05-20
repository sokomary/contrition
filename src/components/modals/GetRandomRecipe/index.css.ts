import { style } from '@vanilla-extract/css';
import { color, MEDIA, px } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(30),
  alignItems: 'center',
});

export const content = style({
  display: 'flex',
  gap: px(25),
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
  height: px(30),
});

export const actions = style({
  marginBottom: px(15),
  justifyContent: 'flex-end',

  '@media': {
    [MEDIA.ipadh]: {
      marginBottom: 0,
    },
  },
});
