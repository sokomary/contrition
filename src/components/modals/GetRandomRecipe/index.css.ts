import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(30),
  alignItems: 'center',
  marginBlockEnd: px(15),
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
  justifyContent: 'flex-end',
});
