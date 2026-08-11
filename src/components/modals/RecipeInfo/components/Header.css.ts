import { style } from '@vanilla-extract/css';
import { px } from 'src/theme';

export const content = style({
  display: 'flex',
  gap: px(10),
  alignItems: 'center',
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

export const icon = style({
  height: px(20),
  width: px(20),
  marginBottom: px(1),
});
