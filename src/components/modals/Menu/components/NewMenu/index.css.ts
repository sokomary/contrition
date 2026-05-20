import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
  borderRadius: px(15),
  padding: `${px(10)} ${px(15)}`,
  display: 'flex',
  flexDirection: 'column',
  gap: px(20),
});

export const meal = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(5),
  alignItems: 'center',
  textAlign: 'center',
  padding: px(5),
});

export const row = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const kindLabel = style({
  width: px(100),
  textAlign: 'center',
});

export const dateLabel = style({
  width: px(35),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

export const empty = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: px(100),
    width: px(100),
    border: `${px(1)} dashed gray`,
    borderRadius: px(5),
  },
  variants: {
    selected: {
      true: {
        borderColor: color('accent'),
      },
    },
  },
});
