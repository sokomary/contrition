import { style } from '@vanilla-extract/css';
import { text, px } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(25),
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(10),
});

export const header = style(text.text3b);
