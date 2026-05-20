import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

export const text = style({
  fontSize: px(14),
  color: color('error'),
});
