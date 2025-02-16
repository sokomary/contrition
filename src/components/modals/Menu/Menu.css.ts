import { style } from '@vanilla-extract/css';
import { text } from 'src/theme';

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
});

export const header = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  ...text.text3,
  fontWeight: 'normal',
});
