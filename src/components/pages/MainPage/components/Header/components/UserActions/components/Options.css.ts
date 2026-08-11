import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

export const container = style({
  display: 'flex',
  borderRadius: px(5),
  background: color('background'),
  boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
  padding: px(8),
  flexDirection: 'column',
  gap: px(8),
});

export const option = style({
  width: 'fit-content',
  minWidth: px(70),
  height: px(25),
  display: 'flex',
  justifyContent: 'flex-start',
  whiteSpace: 'nowrap',
  padding: `0 ${px(4)}`,
});
