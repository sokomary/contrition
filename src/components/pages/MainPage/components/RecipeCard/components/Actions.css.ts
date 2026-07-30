import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

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
  padding: px(8),
});

export const actions = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: px(10),
  backgroundColor: color('background'),
  border: `${px(0.5)} solid`,
  borderColor: color('label'),
  paddingBlock: px(8),
  paddingInline: px(12),
  gap: px(12),
});
