import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';

export const text = style({
  fontSize: '10px',
  color: color('danger'),
});
