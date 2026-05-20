import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

export const recipe = style({
  backgroundColor: color('accent-light'),
  padding: `${px(5)} ${px(10)}`,
  borderRadius: px(15),
  width: 'fit-content',
  height: 'fit-content',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(5),
});

export const content = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: px(5),
});
