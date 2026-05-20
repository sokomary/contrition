import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

export const content = style({
  display: 'flex',
  justifyContent: 'space-between',
  flexShrink: 0,
  padding: px(20),
  borderRadius: px(20),
  background: color('background'),
  boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
  flexDirection: 'column',
  gap: px(5),
});

export const product = style({
  display: 'flex',
  gap: px(5),
});

export const quantity = style({
  width: px(30),
  flexShrink: 0,
  textAlign: 'end',
  fontSize: px(16),
  height: px(19),
});

export const divider = style({
  color: color('label'),
});

export const name = style({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: px(16),
});

export const title = style({
  fontWeight: '500',
  fontSize: px(16),
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(10),
});
