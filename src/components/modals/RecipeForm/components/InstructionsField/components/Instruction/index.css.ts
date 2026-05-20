import { style } from '@vanilla-extract/css';
import { px } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(5),
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  fontSize: px(16),
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(3),
});
