import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';

export const text = style({
  fontSize: '14px',
  color: color('error'),
});
