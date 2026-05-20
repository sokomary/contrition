import { style } from '@vanilla-extract/css';
import { text, px } from 'src/theme';

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(30),
});

export const header = style({
  display: 'flex',
  gap: px(10),
  alignItems: 'center',
  ...text.text3,
  fontWeight: 'normal',
});
