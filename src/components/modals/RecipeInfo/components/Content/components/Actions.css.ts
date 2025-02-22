import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';

export const container = style({
  background: color('background'),
  justifyContent: 'space-between',
  borderRadius: '20px',
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  padding: '5px 15px',
});
