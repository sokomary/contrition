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
  flexDirection: 'column',
});

export const content = style({
  display: 'flex',
  gap: px(10),
  alignItems: 'center',
});

export const element = style({
  borderRadius: px(7),
  height: px(25),
  padding: `0 ${px(10)}`,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: px(14),
  backgroundColor: color('accent-light'),
  color: color('accent'),
  fontWeight: 'bold',
});
