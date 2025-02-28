import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';

export const container = style({
  borderRadius: '15px',
  backgroundColor: color('warning'),
  padding: '15px',
  width: '100%',
});
