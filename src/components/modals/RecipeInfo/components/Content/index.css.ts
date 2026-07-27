import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

export const wrapper = style({
  width: px(500),
  maxWidth: '100%',
  flexDirection: 'column',
  display: 'flex',
  height: '100%',
  justifyContent: 'space-between',
  gap: px(24),
});

export const container = style({
  flexDirection: 'column',
  display: 'flex',
  height: '100%',
  justifyContent: 'space-between',
  gap: px(24),
});

export const actions = style({
  background: color('background'),
  justifyContent: 'space-between',
  borderRadius: px(20),
  boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
  padding: `${px(5)} ${px(15)}`,
});
