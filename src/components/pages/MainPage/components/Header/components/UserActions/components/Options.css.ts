import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

export const container = style({
  display: 'flex',
  position: 'absolute',
  borderRadius: px(5),
  background: color('background'),
  boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
  padding: px(8),
  flexDirection: 'column',
  gap: px(8),
  right: '0',
  top: px(35),
  zIndex: 20,
});

export const option = style({
  width: px(70),
  height: px(25),
  display: 'flex',
  alignItems: 'center',
  padding: `0 ${px(4)}`,
});
