import { style } from '@vanilla-extract/css';
import { px } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(10),
});
export const title = style({ lineHeight: '100%' });

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(10),
});
