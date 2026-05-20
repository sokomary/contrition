import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

export const container = style({
  borderRadius: px(15),
  backgroundColor: color('warning'),
  padding: px(15),
  width: '100%',
});
