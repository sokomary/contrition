import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

export const container = style({
  borderRadius: px(20),
  backgroundColor: color('favorite'),
  flex: 1,
});

export const item = style({
  display: 'flex',
  height: px(30),
  borderRadius: px(20),
  padding: `${px(2)} ${px(12)} ${px(4)} ${px(12)}`,
  alignItems: 'center',
  fontSize: px(16),
  color: color('font'),
  backgroundColor: color('basic'),
});
