import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

export const container = style({
  borderRadius: px(20),
  boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
  flex: 1,
  backgroundColor: color('basic'),
});
