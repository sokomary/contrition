import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  padding: `${px(7)} ${px(15)} ${px(15)} ${px(15)}`,
  flexDirection: 'column',
  maxHeight: '100%',
  gap: 10,
});

export const content = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const header = style({
  display: 'flex',
  gap: px(10),
  alignItems: 'center',
  color: color('label'),
  height: px(32),
});

export const list = recipe({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    rowGap: px(10),
    height: '100%',
    overflowY: 'auto',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
  variants: {
    layout: {
      vertical: {},
      horizontal: {
        flexWrap: 'unset',
        overflowY: 'hidden',
        overflowX: 'scroll',
        gap: px(10),
      },
    },
  },
});

export const title = style({
  alignItems: 'center',
  fontSize: px(16),
  color: color('label'),
});

export const divider = style({
  width: px(5),
  height: px(5),
  borderRadius: px(2.5),
  marginTop: px(2),
  backgroundColor: color('label'),
});
