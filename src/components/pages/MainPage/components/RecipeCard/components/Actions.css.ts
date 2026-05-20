import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

export const container = style({
  position: 'relative',
});

export const dot = style({
  height: px(4),
  width: px(4),
  borderRadius: px(2),
  flexShrink: 0,
  backgroundColor: color('primary'),
});

export const dots = style({
  display: 'flex',
  gap: 2,
  flexDirection: 'column',
});

export const actions = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  borderRadius: px(5),
  backgroundColor: color('background'),
  boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
  padding: px(8),
  gap: px(12),
  right: px(10),
  top: px(-50),
  width: px(135),
});
