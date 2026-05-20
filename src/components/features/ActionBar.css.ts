import { style } from '@vanilla-extract/css';
import { px } from 'src/theme';

export const container = style({
  display: 'flex',
  gap: px(8),
});

export const loader = style({
  height: `${px(20)} !important`,
});
