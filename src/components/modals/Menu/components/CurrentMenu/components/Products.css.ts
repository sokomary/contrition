import { style } from '@vanilla-extract/css';
import { text } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});
export const title = style({ ...text.text3b, lineHeight: '100%' });
