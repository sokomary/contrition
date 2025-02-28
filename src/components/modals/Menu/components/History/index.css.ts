import { style } from '@vanilla-extract/css';
import { text } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const header = style(text.text3b);
