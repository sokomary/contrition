import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  flexDirection: 'column',
  maxHeight: '100%',
  minWidth: px(200),
  gap: 10,
});

export const content = style({
  display: 'flex',
  justifyContent: 'space-between',
  paddingInline: px(15),
  paddingBlockStart: px(7),
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
    flex: 1,
    maxHeight: px(200),
    rowGap: px(10),
    paddingInline: px(15),
    paddingBlockEnd: px(15),

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
  color: color('label'),
});

export const divider = style({
  width: px(5),
  height: px(5),
  borderRadius: px(2.5),
  marginTop: px(2),
  backgroundColor: color('label'),
});
