import { style } from '@vanilla-extract/css';
import { text, px } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(10),
});
export const title = style({ ...text.text3b, lineHeight: '100%' });
