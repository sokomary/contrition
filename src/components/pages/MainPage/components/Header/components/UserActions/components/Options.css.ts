import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';

export const container = style({
  display: 'flex',
  position: 'absolute',
  borderRadius: '5px',
  background: color('background'),
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  padding: '8px',
  flexDirection: 'column',
  gap: '8px',
  right: '0',
  top: '35px',
  zIndex: 20,
});

export const option = style({
  width: '70px',
  height: '25px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 4px',
});
