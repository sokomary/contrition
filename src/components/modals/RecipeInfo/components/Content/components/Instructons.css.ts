import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

export const content = style({
  display: 'flex',
  justifyContent: 'space-between',
  flexShrink: 0,
  gap: px(10),
  padding: px(20),
  borderRadius: px(20),
  background: color('background'),
  boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
  flexDirection: 'column',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(10),
});

export const steps = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(12),
});

export const name = style({
  color: color('accent'),
  fontSize: px(17),
});

export const title = style({
  fontWeight: '500',
  fontSize: px(16),
});

export const step = style({
  fontSize: px(16),
});
