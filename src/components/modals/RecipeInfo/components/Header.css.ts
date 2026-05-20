import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

export const content = style({
  display: 'flex',
  gap: px(4),
});

export const name = style({
  alignSelf: 'flex-start',
  marginTop: 3,
  fontWeight: 'medium',
  fontSize: 18,
  width: 'fit-content',
  maxWidth: 260,
});

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: px(7),
});

export const link = style({
  height: px(18),
  alignSelf: 'flex-start',
  marginTop: px(5),
});

export const icon = style({
  height: px(20),
  width: px(20),
  marginBottom: px(1),
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
