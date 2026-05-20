import { style } from '@vanilla-extract/css';
import { text, px } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(30),
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const title = style({ ...text.text3, lineHeight: '100%' });
